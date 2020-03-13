<template>
  <div>
    <div class="ui container" id="desktop" >
      <DesktopFeedDetail></DesktopFeedDetail>
    </div>
    <div id="mobile" >
      <MobileFeedDetail></MobileFeedDetail>
    </div>
  </div>
</template>

<script>
import DesktopFeedDetail from "./DesktopFeedDetail";
import MobileFeedDetail from "./MobileFeedDetail";

export default {
  name: "App",
  components: {
    DesktopFeedDetail,
    MobileFeedDetail
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

.sticky {
  position: -webkit-sticky;
  position: sticky;
}
</style>
