<template>
  <div class="ui container">
    <div class="ui grid">
      <div class="filters">
        <div class="order">
          <p @click="updateOrd('asc')">
            <i class="mini circle icon" :class="getOrd === 'asc' ? 'green' : ''"></i>
            오름차순
          </p>
          <p @click="updateOrd('desc')">
            <i class="mini circle icon" :class="getOrd === 'desc' ? 'green' : ''"></i>
            내림차순
          </p>
        </div>
        <div class="filter">
          <a class="ui basic mini button" @click="showModal">필터</a>
          <MobileFilterModal v-show="isModalVisible" @close="closeModal" @categorySelect="filter" />
        </div>
      </div>
      <div
        v-for="(feed, feedIndex) in allFeeds.data"
        :key="feed.id + Math.random()"
        class="feed-body"
      >
        <router-link :to="`/mobileFeed/detail/${feed.id}`">
          <div class="ui container feed-header">
            <p>{{ findCategory(feed.category_id) }}</p>
            <p>{{ feed.category_id }}</p>
          </div>
          <div class="ui divider"></div>
          <div class="feed-content">
            <div class="feed-content-userId">
              <p class="userId">{{ feed.user_id }}</p>
              <span class="space">|</span>
              <p>created_at({{ feed.created_at }})</p>
            </div>

            <h3>
              {{
              feed.title.length > 30
              ? feed.title.slice(0, 30) + "..."
              : feed.title
              }}
            </h3>
            <p>{{ feed.contents.length> 30 ? feed.contents.slice(0,30) + '...' : feed.contents }}</p>
          </div>
        </router-link>
        <div v-for="(ad, adIndex) in allAds.data" :key="ad.id + Math.random()" class="ad-contents">
          <div v-if="(feedIndex + 1) / 4 === adIndex + 1">
            <div class="spacer"></div>
            <div class="ui items">
              <div class="meta">
                <h5 class="ui grey header">sponsered</h5>
              </div>
              <div class="item">
                <div class="image">
                  <img :src="IMG_ROOT + ad.img" />
                </div>
                <div class="content">
                  <h3
                    class="header"
                  >{{ ad.title.length> 60 ? ad.title.slice(0,60) + '...' : ad.title }}</h3>
                  <div class="description">
                    <p>{{ ad.contents.length > 60 ? ad.contents.slice(0,60) + '...' : ad.contents }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MobileFilterModal from "./MobileFilterModal";

export default {
  name: "MobileFeed",
  components: { MobileFilterModal },
  data() {
    return {
      IMG_ROOT: "https://cdn.comento.kr/assignment/",
      isModalVisible: false
    };
  },
  computed: {
    ...mapGetters(["allFeeds", "getOrd", "allAds", "getCategory"])
  },
  methods: {
    ...mapActions([
      "fetchFeeds",
      "updateOrd",
      "updatePage",
      "fetchCategory",
      "fetchAds",
      "updateCategory"
    ]),
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.ceil(
            document.documentElement.scrollTop + window.innerHeight + 10
          ) >= document.documentElement.scrollHeight;
        if (bottomOfWindow) {
          this.updatePage();
        }
      };
    },
    async filter(category) {
      this.updateCategory(category);
      await this.fetchFeeds();
    },
    findCategory(id) {
      return this.getCategory.find(el => el.id === id).name;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  },
  async created() {
    await this.fetchCategory();
    await this.fetchFeeds();
    await this.fetchAds();
  },
  mounted() {
    this.scroll();
  }
};
</script>

<style scoped>
div.feed-body {
  background-color: white;
  margin-bottom: 10px;
  width: 100%;
}
div.feed-header {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  height: 19px;
  margin: 0;
}

div.feed-content {
  height: 10em;
}

div.filters {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5em;
  background-color: white;
  width: 100%;
  height: auto;
  padding-top: 1em;
}

div.order {
  width: 150px;
  display: flex;
  justify-content: space-between;
  padding-top: 0.5em;
}

.order p {
  cursor: pointer;
}

.grid {
  margin-top: 0.1em;
}

a {
  color: inherit;
}

div.feed-content-userId {
  display: flex;
  justify-content: start;
}

p.userId {
  color: #00c854;
}

span.space {
  margin-left: 1em;
  margin-right: 1em;
}

.sixteen {
  padding: 0;
}

.spacer {
  position: relative;
  left: -20px;
  height: 0.8em;
  width: 110%;
  background-color: #f4f5f7;
}
</style>