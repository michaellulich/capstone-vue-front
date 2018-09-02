import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import AudioVisual from "vue-audio-visual";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = jwt;
}

Vue.use(require("moment"));
Vue.use(AudioVisual);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
