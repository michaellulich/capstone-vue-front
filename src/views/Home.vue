<template>
  <div class="home">
    <h1>Chicago Shows</h1>
    <h1>All Events</h1>
    <div v-for="event in events">
      <ul>
        <li>{{event.time}} {{event.description}} @ {{event.name}} with: {{getArtistsFromEvent(event)}}</li>

      </ul>
    </div>
     
    
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");
export default {
  data: function() {
    return {
      events: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/events/").then(
      function(response) {
        this.events = response.data;
      }.bind(this)
    );
    axios.get("http://localhost:3000/artist_events/").then(
      function(response) {
        this.artist_events = response.data;
      }.bind(this)
    );
  },
  methods: {
    getArtistsFromEvent: function(inputEvent) {
      return inputEvent.artists.map(artist => artist.name).join(", ");
    }
  },
  computed: {}
};
</script>
