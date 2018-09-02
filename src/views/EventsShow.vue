<template>
  <div class="events-show">
    <div class="container">
      <h1>{{getArtistsFromEvent(event)}}</h1>
      <h3>{{timeConvert(event.time)}}</h3>
      <h2>{{ event.description }} @ {{ event.name }}</h2>
      <h3>{{event.address}}</h3>
      
      
      
      <a href="/#/">Back to all events</a>
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
      event: {},
      errors: []
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/events/" + this.$route.params.id)
      .then(response => {
        this.event = response.data;
      });
  },
  methods: {
    timeConvert: function(inputTime) {
      return moment().format("MMM do YY");
    },
    getArtistsFromEvent: function(inputEvent) {
      return inputEvent.artists.map(artist => artist.name).join(", ");
    }
  }
};
</script>
