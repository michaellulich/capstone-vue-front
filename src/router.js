import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import EventsShow from "./views/EventsShow.vue";
import LoginArtist from "./views/LoginArtist.vue";
import SignupArtist from "./views/SignupArtist.vue";
import EventCreate from "./views/EventCreate.vue";
import Profile from "./views/Profile.vue";
import User_Event from "./views/User_Event.vue";
import ArtistShow from "./views/ArtistShow.vue";
import Visualizer from "./views/Visualizer.vue";
import SpotifyVisualizer from "./views/SpotifyVisualizer.vue";

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
    { path: "/events/:id", name: "events-show", component: EventsShow },
    { path: "/loginartist", name: "loginartist", component: LoginArtist },
    { path: "/signupartist", name: "signupartist", component: SignupArtist },
    { path: "/eventcreate", name: "eventcreate", component: EventCreate },
    { path: "/profile", name: "profile", component: Profile },
    { path: "/user_event", name: "user_event", component: User_Event },
    { path: "/artistshow/:id", name: "artistshow", component: ArtistShow },
    { path: "/visualizer/", name: "visualizer", component: Visualizer },
    {
      path: "/SpotifyVisualizer/",
      name: "spotifyvisualizer",
      component: SpotifyVisualizer
    }
  ]
});
