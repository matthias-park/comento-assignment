<template>
  <div>
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

export default {
  name: "App",
  components: {
    DesktopFeed,
    MobileFeed
  },
  methods: {
    onTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
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

@media screen and (max-width: 480px) {
  #desktop {
    display: none;
  }
  #mobile {
    display: flex;
  }
}
.icon {
  cursor: pointer;
}
</style>
