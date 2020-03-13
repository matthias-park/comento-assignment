<template>
  <div class="ui container">
    <div class="ui segment main-feed">
      <div class="feed-header">
        <h3>
          {{ getDetail.title }}
        </h3>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-contents">
        <p>
          {{ getDetail.contents }}
        </p>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-timestamp">
        <p>{{ "created_at(" + getDetail.created_at.slice(0, 10) + ")" }}</p>
      </div>
    </div>

    <h4 class="ui grey header">
      답변:
      <span class="coment-number">{{ getDetail.reply.length }}</span>
    </h4>
    <div class="ui segment" v-for="reply in getDetail.reply" :key="reply.id">
      <div class="ui grey header feed-user">
        <h4>{{ reply.user.name }}</h4>
      </div>
      <div class="ui divider"></div>
      <div class="feed-header">
        <h3>{{ reply.title }}</h3>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-contents">
        <p>{{ reply.contents }}</p>
      </div>
      <div class="ui hidden divider"></div>
      <div class="feed-timestamp">
        <p>{{ "created_at(" + reply.created_at.slice(0, 10) + ")" }}</p>
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
    ...mapGetters(["getDetail"])
  },
  methods: {
    ...mapActions(["fetchDetail"])
  },
  async created() {
    await this.fetchDetail(this.$route.params.id);
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

.feed-timestamp {
  color: #adb5bd;
}
</style>
