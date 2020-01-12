import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import IconButton from "./components/IconButton.vue";
import autofocus from "./directives/autofocus";

Vue.config.productionTip = false;
Vue.component("icon-button", IconButton);
Vue.directive("autofocus", autofocus);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
