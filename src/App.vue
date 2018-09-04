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
                <h5 class="white-text">LoCALE</h5>
                <p class="grey-text text-lighten-4">Bringing Artists and fans together.</p>
              </div>
          </div>
        <div class="footer-copyright">
      <div class="container">
        2018
     </div>
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
}
.nav-wrapper {
  background-color: #222a12;
}
.nav-wrapper-a {
  color: red;
}

h1 {
  font-family: "Baloo Tammudu";
}

.brand-logo.right {
  font-family: "Baloo Tammudu";
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
