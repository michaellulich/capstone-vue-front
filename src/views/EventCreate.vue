<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Event Create</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Address:</label> 
          <input type="text" class="form-control" v-model="address">
        </div>
        <div class="form-group">
          <label>Venue Name:</label>
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label>Event Description:</label>
          <input type="text" class="form-control" v-model="description">
        </div>
        <div class="form-group">
          <label>Time:</label>
          <input type="datetime-local" class="form-control" v-model="time">
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
      address: "",
      name: "",
      email: "",
      time: "",
      password: "",
      description: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        address: this.address,
        name: this.name,
        email: this.email,
        time: this.time,
        description: this.description,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("http://localhost:3000/events", params)
        .then(response => {
          this.$router.push("/events/" + response.data.id);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
