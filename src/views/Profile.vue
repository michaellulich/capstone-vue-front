<template>
  <div class="profile">
      <div class='container'>
      <h2>{{ user.name }}'s Events</h2>
        <div class="event list" v-for="event in events" v-if='event.user_event'>
          <ul class="collection" >
            <li class="collection-item avatar" >
              <img v-for='artist in event.artists' v-bind:src="`${event.artists[0].primary_image}`" alt="" class='circle'>
              <span class="title">{{getArtistsFromEvent(event)}} @ {{event.name}}</span>
              <p>{{timeConvert(event.time)}}<br>
                 {{event.address}} 
              </p>
              <button ><a v-bind:href="'/#/events/' + event.id">Event Info</a></button>
              <a v-if="event.favorited" v-bind:class="{favorited: event.favorited}"v-on:click='removeFromFavorites(event)'class="secondary-content"><i class="material-icons">grade</i></a>
            </li>
          </ul>

        </div>        
        <!-- <div class="row">
              <div class="col s4" v-for="event in events" v-if='event.user_event'>
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="https://images-na.ssl-images-amazon.com/images/I/716EFOeWz8L._SL1350_.jpg">
                  </div>
                  <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">{{getArtistsFromEvent(event)}}<i class="material-icons right">more_vert</i></span>
                  </div>
                  <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">{{getArtistsFromEvent(event)}}<i class="material-icons right">close</i></span>
                    <ul>
                          <li>{{timeConvert(event.time)}}</li> 
                          <li>{{event.description}}</li> 
                          <li>@ {{event.name}} {{event.address}}</li> 
                    </ul>
                       <div > 
                        <button ><a v-bind:href="'/#/events/' + event.id">Event Info</a></button>
                        <button v-if="!event.favorited" v-bind:class="{favorited: event.favorited}" v-on:click='addToFavorites(event)'>Add to My Events</button>
                        <button v-if="event.favorited" v-bind:class="{favorited: event.favorited}"v-on:click='removeFromFavorites(event)'>Remove From My Events</button>
                      </div>
                     </div>
                  </div>
                </div>
              </div>
              <a href="/#/">Back to all events</a>
            </div> -->
    <a href="/#/"><input type="submit" class='btn btn primary' value='Back To All Events'></a>
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
      user: {},
      events: {},
      errors: []
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/usersprofile/")
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        this.$router.push("/login/");
      });
    axios.get("http://localhost:3000/events").then(response => {
      this.events = response.data;
    });
  },
  methods: {
    getArtistsFromEvent: function(inputEvent) {
      return inputEvent.artists.map(artist => artist.name).join(", ");
    },
    timeConvert: function(inputTime) {
      return moment().format("MMM do YY");
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
