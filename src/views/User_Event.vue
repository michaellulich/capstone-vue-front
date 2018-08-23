<template>
  <div class="user_event">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>User_Event Create</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Event_id</label>
          <input type="number" class="form-control" v-model="event_id">
        </div>
        <input type="submit" class="btn btn-primary" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      event_id: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        event_id: this.event_id
      };
      axios
        .post("http://localhost:3000/user_events", params)
        .then(response => {
          this.$router.push(response.data.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
