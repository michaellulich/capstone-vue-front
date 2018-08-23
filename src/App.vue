<template>
  <div id="app">
<!-- Dropdown Structure -->
<nav>
  <div class="nav-wrapper">
    <div class="container">
      <a href="/#/" class="brand-logo">IATM</a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
          <ul class="right hide-on-med-and-down">
            <li><a href="">Home</a></li>
            <!-- Dropdown Trigger -->
            <li><a class="dropdown-trigger" href="" data-target="dropdown1">SignUp<i class="material-icons right">arrow_drop_down</i></a></li>
             <!-- Dropdown Trigger -->
            <li><a class="dropdown-trigger" href="" data-target="dropdown2">SignIn<i class="material-icons right">arrow_drop_down</i></a></li>
            <li><a href="/#/logout">LogOut</a></li>
          </ul>
    </div>
  </div>
</nav>
  





  <ul id="dropdown1" class="dropdown-content">
    <li><a href="/#/signupartist">ARTIST</a></li>
    <li><a href="/#/signup">USER</a></li>
  </ul>
    <ul id="dropdown2" class="dropdown-content">
      <li><a href="/#/loginartist">ARTIST</a></li>
      <li><a href="/#/login">USER</a></li>
    </ul>
      <ul class="sidenav" id="mobile-demo">
      </ul>

<div class="container">
    <router-view/>
</div>  


<!-- Footer -->
<footer class="page-footer">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">IATM</h5>
                <p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                <ul>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
                  <li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            2018
            <a class="grey-text text-lighten-4 right" href="#!">More Links</a>
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
</style>

<script>
export default {
  created: function() {
    $(document).ready(function() {
      $(".dropdown-trigger").dropdown();
    }),
      $(document).ready(function() {
        $(".sidenav").sidenav();
      });
  }
};
</script>




