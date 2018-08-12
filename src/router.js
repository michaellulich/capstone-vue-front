import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Mapstest from "./views/Mapstest.vue";
import EventsShow from "./views/EventsShow.vue";
import LoginArtist from "./views/LoginArtist.vue";
import SignupArtist from "./views/SignupArtist.vue";
import EventCreate from "./views/EventCreate.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    { path: "/signup", name: "signup", component: Signup },
    { path: "/login", name: "login", component: Login },
    { path: "/logout", name: "logout", component: Logout },
    { path: "/mapstest", name: "mapstest", component: Mapstest },
    { path: "/events/:id", name: "events-show", component: EventsShow },
    { path: "/loginartist", name: "loginartist", component: LoginArtist },
    { path: "/signupartist", name: "signupartist", component: SignupArtist },
    { path: "/eventcreate", name: "eventcreate", component: EventCreate }
  ]
});
