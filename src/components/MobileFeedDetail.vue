<template>
  <div class="ui">
    <div class="nav">
      <i class="icon big angle left" @click="goToBack"></i>
    </div>
    <div class="spacer"></div>
    <div class="main-feed">
      <div class="feed-header" id="main-feed-header">
        <h3>{{ getDetail.title }}</h3>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-contents">
        <p>{{ getDetail.contents }}</p>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-timestamp" id="main-feed-timestamp">
        <p>{{ "created_at(" + getDetail.created_at.slice(0, 10) + ")" }}</p>
      </div>
    </div>

    <h4 class="ui grey header feed-count">
      답변:
      <span class="coment-number">{{ getDetail.reply.length }}</span>
    </h4>

    <div v-for="reply in getDetail.reply" :key="reply.id">
      <div class="feed-reply">
        <div class="ui divider"></div>
        <h4 class="ui grey header reply">{{ reply.user.name }}</h4>
        <div class="ui divider"></div>
        <div class="feed-header">
          <h3>{{ reply.title }}</h3>
        </div>
        <div class="ui hidden divider"></div>
        <div class="feed-contents">
          <p>{{ reply.contents }}</p>
        </div>
        <div class="feed-timestamp">
          <p>{{ "created_at(" + reply.created_at.slice(0, 10) + ")" }}</p>
        </div>
        <div class="ui divider"></div>
      </div>
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
    ...mapGetters(["getDetail"])
  },
  methods: {
    ...mapActions(["fetchDetail"]),
    goToBack() {
      router.push("/");
    }
  },
  async created() {
    await this.fetchDetail(this.$route.params.id);
  }
};
</script>

<style scoped>
div.nav {
  padding-top: 0.5em;
  height: 45px;
  background-color: white;
}
div.main-feed {
  padding: 1em;
  background-color: white;
}
div#main-feed-header {
  border-top: 1px solid #00c854;
  padding-top: 1em;
}

div#main-feed-timestamp {
  border-bottom: 1px solid #00c854;
  padding-bottom: 0.5em;
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
  margin-top: 1em;
  margin-bottom: 0;
  color: #adb5bd;
}

.ui {
  background-color: white;
  overflow-x: hidden;
}

.feed-count,
.feed-reply {
  padding: 0 1em 0.1em 1em;
}
</style>
