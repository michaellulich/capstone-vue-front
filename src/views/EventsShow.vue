<template>
  <div class="events-show">
    <div class="container">
      <!-- <h4>{{getArtistsFromEvent(event)}}</h4> -->
      <h3>{{event.formatted_time}}</h3>
      <h2>{{ event.description }} @ {{ event.name }}</h2>
      <h3>{{event.address}}</h3>
      <div v-for="artist in event.artists" class="carousel">
        <a v-for="(image, index) in artist.images" class="carousel-item">
          <img v-bind:src="image">
        </a>
      </div>     
        <a href="/#/"><input type="submit" class='btn btn primary' value='Back To Events'>
      </a>
    </div>
  </div>
</template>
<style>
.carousel {
  height: 40vh;
}
</style>
<script>
import Vue from "vue";

var moment = require("moment");
var axios = require("axios");
// import axios from "axios";

export default {
  data: function() {
    return {
      event: {},
      errors: [],
      artists: {}
      // getImagesFromArtist: ""
    };
  },
  mounted: function() {
    // $(".carousel").carousel();
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
    }
  }
};
</script>
