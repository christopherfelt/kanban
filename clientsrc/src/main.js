import Vue from "vue";
// @ts-ignore
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Auth0Plugin } from "@bcwdev/auth0-vue";
import { domain, clientId, audience } from "./authConfig";
import VueTour from "vue-tour";
// @ts-ignore
require("vue-tour/dist/vue-tour.css");

// @ts-ignore
Vue.use(VueTour);

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  },
});

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
