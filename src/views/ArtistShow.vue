<template>
  <div class="ArtistShow">
    <div class="row">
      <div class="col s4" v-for="artist in artists">
        <div v-for="miniArtist in artist">
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="https://images-na.ssl-images-amazon.com/images/I/716EFOeWz8L._SL1350_.jpg">
            </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i></span>
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span>
              <ul>
                <li>{{timeConvert(miniArtist.time)}}</li> 
                <li>{{miniArtist.description}}</li> 
                <li>@ {{miniArtist.name}} {{miniArtist.address}}</li> 
              </ul>
              <!-- <div v-on:click="favoriteButton(event)"> 
                <button ><a v-bind:href="'/#/events/' + event.id">Event Info</a></button>
                <button v-if="!event.favorited" v-bind:class="{favorited: event.favorited}" v-on:click='addToFavorites(event)'>Add to My Events</button>
                <button v-if="event.favorited" v-bind:class="{favorited: event.favorited}"v-on:click='removeFromFavorites(event)'>Remove From My Events</button>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
var axios = require("axios");
// import axios from "axios";

export default {
  data: function() {
    return {
      artists: [],
      events: [],
      errors: []
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/artists/" + this.$route.params.id)
      .then(response => {
        console.log(response.data);
        this.artists = response.data;
      });
  },
  methods: {
    timeConvert: function(inputTime) {
      return moment().format("MMM do YY");
    },
    getEvent: function(inputArtist) {
      return inputArtist.map(elem => elem["id"]);
    }
  }
};
</script>
