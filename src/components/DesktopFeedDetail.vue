<template>
  <div class="ui container">
    <div class="ui segment main-feed">
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

    <h4 class="ui grey header">
      답변:
      <span class="coment-number">2</span>
    </h4>
    <div class="ui segment">
      <div class="feed-header">
        <h3>{{ trimmedTitle }}</h3>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-contents">
        <p>{{ trimmedContents }}</p>
      </div>
      <div class="ui hidden divider"></div>
      <div class="ui grey header feed-timestamp">
        <h4>{{ getFeed.created_at }}</h4>
      </div>
    </div>
    <div class="ui segment">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DesktopFeedDetail",
  data() {
    return {
      feedId: 0,
      feed: {}
    };
  },
  computed: {
    ...mapGetters(["getFeed"]),
    trimmedTitle() {
      return this.getFeed.title.length > 200
        ? this.getFeed.title.slice(0, 200) + "..."
        : this.getFeed.title;
    },
    trimmedContents() {
      return this.getFeed.contents.length > 300
        ? this.getFeed.contents.slice(0, 300) + "..."
        : this.getFeed.contents;
    },
    trimmedTimestamp() {
      return "created_at(" + this.getFeed.created_at.slice(0, 10) + ")";
    }
  },
  methods: {
    ...mapActions(["selectedFeed"])
  },
  created() {
    this.selectedFeed(this.$route.params.id);
  }
};
</script>

<style scoped>
div .container {
  padding-top: 5em;
}

div.main-feed {
  border-color: #00c854;
}

span.coment-number {
  color: #00c854;
}
</style>
