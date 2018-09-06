<template>
  <div class="events-show">
    <div class="container">
      <!-- <h2>{{getArtistsFromEvent(event)}}</h2> -->
      <h3>{{event.formatted_time}}</h3>
      <h3>{{ event.description }} @ {{ event.name }}</h3>
      <h3>{{event.address}}</h3>
      <div v-for="artist in event.artists" class="carousel">
        <a v-for="(image, index) in artist.images" class="carousel-item">
          <img v-bind:src="image">
        </a>
      </div>     
      <a href="/#/"><input type="submit" class='btn btn-flat' value='Back To Events'></a>
      <div v-for="artist in event.artists">
        <button data-target="modal" class="btn modal-trigger btn-flat"  v-on:click="spotifyArtistSearch(artist.name)">{{ artist.name }}</button>
      </div>
        <!-- <button class='btn btn-flat'><a v-bind:href="'/#/profile'" >User Profile</a></button> -->
      <a class="waves-effect waves-orange btn-flat" v-bind:href="'/#/profile'">User Profile</a> 
      <div v-on:click="favoriteButton(event)"> 
            <button class="btn btn-flat" v-if="!event.favorited" v-bind:class="{favorited: event.favorited}" v-on:click='addToFavorites(event)'>I'd like to go.</button>
            <button class="btn btn-flat" v-if="event.favorited" v-bind:class="{favorited: event.favorited}"v-on:click='removeFromFavorites(event)'>I Can't Go</button>
      </div>
    </div>

          <div id="modal" class="modal" >
            <div class="modal-content">
              <div class="row">
                  <div class="col s12">
                    <ul class="tabs">
                      <li class="tab col s6"><a class="active" href="#test1">Current Artist</a></li>
                      <li class="tab col s6"><a  href="#test2" v-on:click="getRelatedArtist()">Related Artists</a></li>
                      <!-- <li class="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
                      <li class="tab col s3"><a href="#test4">Test 4</a></li> -->
                    </ul>
                  </div>
          
            


            <div id="test1" class="col s12"><p><iframe v-bind:src="`https://open.spotify.com/embed/artist/${currentArtistTrackSpotifyID}`" width="380" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></p>
            </div>
            <div id="test2" class="col s12">
              <p>
                <iframe v-bind:src="`https://open.spotify.com/embed/artist/${randomArtistID}`" width="380" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <button class='btn btn-flat' v-on:click='getRelatedArtist()'>New Related Artist</button>
              </p>
            </div>
            <!-- <div id="test3" class="col s12">Test 3</div>
            <div id="test4" class="col s12">Test 4</div> -->
        </div>
    </div>
  </div>
</div>

</template>

<style>
.carousel {
  height: 30vh;
}
h3 {
  font-family: "Indie Flower", cursive;
}
</style>
<script>
/*global $ */

import Vue from "vue";

var moment = require("moment");
var axios = require("axios");
// import axios from "axios";

export default {
  data: function() {
    return {
      event: {},
      errors: [],
      artists: {},
      currentArtist: "",
      currentArtistTrackSpotifyID: "",
      randomArtistID: ""
    };
  },
  mounted: function() {
    $(document).ready(function() {
      $(".modal").modal();
      $(".tabs").tabs();
    });
  },
  created: function() {
    axios
      .get("http://localhost:3000/events/" + this.$route.params.id)
      .then(response => {
        this.event = response.data;
        Vue.nextTick(function() {
          $(".carousel").carousel();
        });
      });
  },
  methods: {
    getArtistsFromEvent: function(inputEvent) {
      return inputEvent.artists.map(artist => artist.name).join(", ");
    },
    spotifyArtistSearch: function(inputArtist) {
      var accessToken = localStorage.getItem("spotifyAccessToken");
      // console.log(accessToken);
      var currentArtist = inputArtist;
      axios
        .get(
          `https://api.spotify.com/v1/search?q=${currentArtist}&type=artist`,
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        )
        .then(
          function(response) {
            this.currentArtistTrackSpotifyID =
              response.data["artists"]["items"][0]["id"];
            // console.log(response.data["artists"]);
          }.bind(this)
        );
    },
    getRelatedArtist: function(inputArtist) {
      var accessToken = localStorage.getItem("spotifyAccessToken");
      // console.log("getRelatedArtist", this.currentArtistTrackSpotifyID);
      axios
        .get(
          `https://api.spotify.com/v1/artists/${
            this.currentArtistTrackSpotifyID
          }/related-artists`,
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        )
        .then(
          function(response) {
            var randomIndex = Math.floor(Math.random() * 21);
            // console.log(randomIndex);
            this.randomArtistID = response.data.artists[randomIndex].id;
          }.bind(this)
        );
    },
    favoriteButton: function(inputEvent) {
      inputEvent.favorited = !inputEvent.favorited;
    },
    addToFavorites: function(inputEvent) {
      axios
        .post("http://localhost:3000/user_events", { event_id: inputEvent.id })
        .then(response => {
          inputEvent.user_event = response.data;
        })
        .catch(error => {
          // this.errors = error.response.data.errors;
          this.$router.push("/login/");
        });
    },
    removeFromFavorites: function(inputEvent) {
      axios
        .delete("http://localhost:3000/user_events/" + inputEvent.user_event.id)
        .then(response => {
          inputEvent.user_event = null;
          // var index = this.user_events.indexOf(inputEvent);
          // this.user_events.splice(index, 1);
        });
    }
  }
};
</script>
