import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import DesktopFeedDetail from "./components/DesktopFeedDetail";
import MobileFeedDetail from "./components/MobileFeedDetail";
import store from "./store";
import YaModal from "vue-ya-semantic-modal";

Vue.use(VueRouter);
Vue.use(YaModal);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/desktopFeed/detail/:id", component: DesktopFeedDetail },
    { path: "/mobileFeed/detail/:id", component: MobileFeedDetail }
  ]
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
