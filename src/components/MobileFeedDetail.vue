<template>
  <div class="ui container">
    <div class="nav">
      <i class="icon big angle left" @click="goToBack"></i>
    </div>
    <div class="spacer"></div>
    <div class="main-feed">
      <div class="feed-header" id="main-feed-header">
        <h3>{{ trimmedTitle}}</h3>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-contents">
        <p>{{trimmedContents }}</p>
      </div>
      <div class="ui hidden divider"></div>
      <div class="ui grey header feed-timestamp" id="main-feed-timestamp">
        <h4>{{ trimmedTimestamp }}</h4>
      </div>
    </div>

    <h4 class="ui grey header">
      답변:
      <span class="coment-number">2</span>
    </h4>

    <div>
      <div class="ui divider"></div>
      <h4 class="ui grey header reply">reply_user_name</h4>
      <div class="ui divider"></div>
      <div class="feed-header">
        <h3>{{ trimmedTitle }}</h3>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-contents">
        <p>{{ trimmedContents }}</p>
      </div>
      <div class="ui hidden divider"></div>
      <div class="ui grey header feed-timestamp">
        <h4>{{ trimmedTimestamp }}</h4>
      </div>
    </div>
    <div>
      <div class="ui divider"></div>
      <h4 class="ui grey header reply">reply_user_name</h4>
      <div class="ui divider"></div>
      <div class="feed-header">
        <h3>{{ trimmedTitle }}</h3>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-contents">
        <p>{{ trimmedContents }}</p>
      </div>
      <div class="ui hidden divider"></div>
      <div class="ui grey header feed-timestamp">
        <h4>{{ trimmedTimestamp }}</h4>
      </div>
      <div class="ui divider"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { router } from "../main";

export default {
  name: "MobileFeedDetail",
  data() {
    return {
      feedId: 0,
      feed: {}
    };
  },
  computed: {
    ...mapGetters(["getFeed"]),
    trimmedTitle() {
      return this.getFeed.title.length > 90
        ? this.getFeed.title.slice(0, 90) + "..."
        : this.getFeed.title;
    },
    trimmedContents() {
      return this.getFeed.contents.length > 90
        ? this.getFeed.contents.slice(0, 90) + "..."
        : this.getFeed.contents;
    },
    trimmedTimestamp() {
      return "created_at(" + this.getFeed.created_at.slice(0, 10) + ")";
    }
  },
  methods: {
    ...mapActions(["selectedFeed"]),
    goToBack() {
      router.push("/");
    }
  },
  created() {
    this.selectedFeed(this.$route.params.id);
  }
};
</script>

<style scoped>
div.nav {
  padding-top: 0.5em;
  height: 45px;
}
div.main-feed {
  padding-top: 1em;
}
div#main-feed-header {
  border-top: 1px solid #00c854;
  padding-top: 1em;
}

div#main-feed-timestamp {
  border-bottom: 1px solid #00c854;
  padding-bottom: 1em;
}

span.coment-number {
  color: #00c854;
}
.spacer {
  position: relative;
  left: -25px;
  height: 0.8em;
  width: 110%;
  background-color: #f4f5f7;
}

.feed-timestamp {
  height: 2em;
}
</style>
