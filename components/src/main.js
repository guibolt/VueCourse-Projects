import Vue from "vue";
import App from "./assets/App.vue";

import AppContador from "./components/AppContador.vue";

Vue.component("app-contador", AppContador);

new Vue({
  el: "#app",
  render: h => h(App)
});
