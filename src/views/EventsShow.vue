<template>
  <div class="events-show">
    <div class="container">
      <h2>{{ event.name }}</h2>
      <p>{{ event.description }}</p>
      <p>{{timeConvert(event.time)}}</p>
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
    }
  }
};
</script>
