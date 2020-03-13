import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
// import DesktopFeedDetail from "./components/DesktopFeedDetail";
// import MobileFeedDetail from "./components/MobileFeedDetail";
import FeedDetail from './components/FeedDetail';
import store from "./store";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    // { path: "/desktopFeed/detail/:id", component: DesktopFeedDetail },
    // { path: "/mobileFeed/detail/:id", component: MobileFeedDetail },
    { path: "/feed/detail/:id", component:FeedDetail},
  ]
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
