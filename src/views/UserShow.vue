<template>
  <div class="user-show">
    <div class="container">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p>{{user.user_id}}</p>
      <p>{{user.event_id}}</p>
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
      user: {},
      errors: []
    };
  },
  created: function() {
    axios
      .get("http://localhost:3000/users/" + this.$route.params.id)
      .then(response => {
        this.user = response.data;
      });
  },
  methods: {}
};
</script>
