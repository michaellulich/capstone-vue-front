

<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Artist Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label> 
          <input type="text" class="form-control" v-model="name">
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label>Genre:</label>
          <input type="text" class="form-control" v-model="genre">
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation">
        </div>
        <input type="submit" class="btn btn-primary btn-flat" value="Submit">

      </form>
      <a href="/#/"><input type="submit" class='btn btn-flat' value='Back To Events'></a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      genre: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("http://localhost:3000/artists", params)
        .then(response => {
          axios
            .post("http://localhost:3000/artist_sessions", params)
            .then(response => {
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + response.data.jwt;
              localStorage.setItem("jwt", response.data.jwt);
              this.$router.push("/eventcreate");
            })
            .catch(error => {
              this.errors = ["Invalid email or password."];
              this.email = "";
              this.password = "";
            });
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
