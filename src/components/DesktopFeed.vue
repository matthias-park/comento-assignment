<template>
  <div class="ui container">
    <div class="ui grid">
      <div class="three wide column">
        <button class="fluid massive ui positive button">로그인</button>
      </div>
      <div class="thirteen wide column">
        <div class="filters">
          <div class="order">
            <p @click="updateOrd('asc')" :class="getOrd === 'asc' ? 'selectedOrd' : 'ord'">
              <i class="mini circle icon" :class="getOrd === 'asc' ? 'green' : ''"></i>
              오름차순
            </p>
            <p @click="updateOrd('desc')" :class="getOrd === 'desc' ? 'selectedOrd' : 'ord'">
              <i class="mini circle icon" :class="getOrd === 'desc' ? 'green' : ''"></i>
              내림차순
            </p>
          </div>
          <div class="filter">
            <a class="ui basic mini button" @click="showModal">필터</a>
            <DesktopFilterModal
              v-show="isModalVisible"
              @close="closeModal"
              @categorySelect="filter"
            />
          </div>
        </div>
        <div v-for="(feed, feedIndex) in allFeeds.data" :key="feed.id + Math.random()">
          <router-link :to="`/feed/detail/${feed.id}`">
            <div class="ui feed-box">
              <div class="ui container">
                <div class="feed-header">
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
                    feed.title.length > 90
                    ? feed.title.slice(0, 90) + "..."
                    : feed.title
                    }}
                  </h3>
                  <p>
                    {{
                    feed.contents.length > 70
                    ? feed.contents.slice(0, 70) + "..."
                    : feed.contents
                    }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
          <div
            v-for="(ad, adIndex) in allAds.data"
            :key="ad.id + Math.random()"
            class="ad-contents"
          >
            <div v-if="(feedIndex + 1) / 4 === adIndex + 1" class="ui feed-box">
              <div class="ui items">
                <div class="meta">
                  <h4 class="ui grey header">sponsered</h4>
                </div>
                <div class="item">
                  <div class="image">
                    <img :src="IMG_ROOT + ad.img" />
                  </div>
                  <div class="content">
                    <h3 class="header">
                      {{
                      ad.title.length > 120
                      ? ad.title.slice(0, 120) + "..."
                      : ad.title
                      }}
                    </h3>
                    <div class="description">
                      <p>
                        {{
                        ad.contents.length > 250
                        ? ad.contents.slice(0, 250) + "..."
                        : ad.contents
                        }}
                      </p>
                    </div>
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
import DesktopFilterModal from "./DesktopFilterModal";

export default {
  name: "DesktopFeed",
  components: { DesktopFilterModal },
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
div.feed-header {
  color: #adb5bd;
  display: flex;
  justify-content: space-between;
}

div.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
}

div.order {
  width: 150px;
  display: flex;
  justify-content: space-between;
}

.order p {
  cursor: pointer;
}

.grid {
  margin-top: 5em;
}

a {
  color: inherit;
}

.ad-contents {
  margin: 2em 0 2em 0;
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

.feed-box {
  padding: 1em;
  border: 1px solid #e1e4e7;
  border-radius: 5px;
}

.filter {
  z-index: 10;
}

.ord {
  color: #adb5bd;
}

.selectedOrd {
  color: black;
}


</style>
