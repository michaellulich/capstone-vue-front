<template>
  <div id="app">
      
<!-- Dropdown Structure -->
<nav>
  <div class="nav-wrapper">
    <div class="container">
      <a href="/#/" class="brand-logo right">LoCALE</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="left hide-on-med-and-down">
            <li><a href="">Home</a></li>
            <!-- Dropdown Trigger -->
            <li><a class="dropdown-trigger" href="" data-target="dropdown1">SignUp<i class="material-icons right">arrow_drop_down</i></a></li>
             <!-- Dropdown Trigger -->
            <li><a class="dropdown-trigger" href="" data-target="dropdown2">LogIn<i class="material-icons right">arrow_drop_down</i></a></li>
            <li><a href="/#/logout">LogOut</a></li>
          </ul>
    </div>
  </div>
</nav>

<!-- <div>
  <ul class="sidenav" id="mobile-demo">
    <li><a href="">Home</a>
      </li>
        Dropdown Trigger -->
        <!-- <li><a class="dropdown-trigger" href="" data-target="dropdown1">SignUp<i class="material-icons right">arrow_drop_down</i></a>
      </li>
      < Dropdown Trigger -->
        <!-- <li><a class="dropdown-trigger" href="" data-target="dropdown2">LogIn<i class="material-icons right">arrow_drop_down</i></a>
        </li>
      <li><a href="/#/logout">LogOut</a>
      </li>  
  </ul>
</div> --> 
  

<!-- drop down links -->
<ul id="dropdown1" class="dropdown-content">
    <li><a href="/#/signupartist">ARTIST</a></li>
    <li><a href="/#/signup">USER</a></li>
</ul>
<ul id="dropdown2" class="dropdown-content">
      <li><a href="/#/loginartist">ARTIST</a></li>
      <li><a href="/#/login">USER</a></li>
      <li><a href="https://accounts.spotify.com/authorize?client_id=d45c03352faf4be4884e657dc00ce33f&response_type=code&redirect_uri=http://localhost:8080/">Spotify</a></li>
</ul>



<!-- parallax picture -->

    <router-view/>

<div class="parallax-container">
      <div class="parallax"><img src="https://imgur.com/cwvA4Uj.jpg"></div>
    </div>

<!-- Footer -->
<footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text" id="orange" >LoCALE</h5>
                <p class="grey-text text-lighten-4" id="orange" >Bringing Artists and fans together.</p>
              </div>
          </div>
        <div class="footer-copyright">
    </div>
  </div>
</footer>
</div>
</template>

<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}
.parallax-container {
  height: 275px;
}

.page-footer {
  background-color: #222a12;
  font-family: "Baloo Tammudu";
}
.nav-wrapper {
  background-color: #222a12;
}
.nav-wrapper-li {
  color: orange;
}

h1 {
  font-family: "Baloo Tammudu";
}
li {
  font-family: "Indie Flower", cursive;
}

.brand-logo.right {
  font-family: "Baloo Tammudu";
  color: orange;
  padding-right: 35px !important;
  padding-top: 10px !important;
}

.dropdown-trigger {
  color: orange !important;
}

.material-icons {
  color: orange !important;
}

.nav-wrapper a {
  color: orange !important;
}

footer p {
  color: orange !important;
}

#orange {
  color: orange !important;
}

.btn:hover,
.btn-large:hover,
.btn-small:hover {
  background-color: #64dd17;
}

.btn:hover,
.btn-large:hover,
.btn-small:hover
.orange {
  background-color: #64dd17;
}
</style>

<script>
export default {
  created: function() {
    $(document).ready(function() {
      $(".dropdown-trigger").dropdown();
      $(".parallax").parallax();
      $(".sidenav").sidenav();
    });
  }
};
</script>
