<template>
  <div>
    <div class="nav ui container">
      <i class="icon big angle left" id="back" v-if="$route.params.id" @click="goToBack"></i>
      <span>[박준수] 2020.03.13</span>
    </div>
    <div class="ui divider"></div>
    <router-view></router-view>
    <div class="ui container" id="desktop" v-if="!$route.params.id">
      <DesktopFeed></DesktopFeed>
    </div>
    <div id="mobile" v-if="!$route.params.id">
      <MobileFeed></MobileFeed>
    </div>

    <div class="ui fluid secondary bottom fixed three item menu">
      <div class="item">
        <i class="icon big blue angle double up" @click="onTop"></i>
      </div>
      <div class="item"></div>
      <div class="item">
        <a
          href="https://www.notion.so/1d8eafffa6084029ad0e04f4072d3029?v=0a3d79885adc4d01883b4e8b8cb7e578"
          target="_blank"
        >
          <i class="icon big question circle"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import DesktopFeed from "./components/DesktopFeed";
import MobileFeed from "./components/MobileFeed";
import { router } from "./main";

export default {
  name: "App",
  components: {
    DesktopFeed,
    MobileFeed
  },
  methods: {
    onTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    goToBack() {
      router.push("/");
    }
  }
};
</script>

<style>
div {
  vertical-align: top !important;
}
#mobile {
  display: none;
  background-color: #f4f5f7;
}
#back {
  display: none;
}

@media screen and (max-width: 480px) {
  #desktop {
    display: none;
  }
  #mobile {
    display: flex;
  }
  #back {
    display: inline-block;
    padding-left: 10px;
  }
}
.icon {
  cursor: pointer;
}

div.nav {
  padding-top: 0.5em;
  height: 45px;
  background-color: white;
  display: flex;
}
</style>
