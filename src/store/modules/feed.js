import api from "../../api/comento";

const state = {
  feeds: [],
  page: 1,
  ord: "asc",
  category: [],
  limit: 8,
  ads: [],
  feed: {},
  detail: {}
};

const getters = {
  allFeeds: state => state.feeds,
  allAds: state => state.ads,
  getPage: state => state.page,
  getOrd: state => state.ord,
  getCategory: state => state.category,
  getLimit: state => state.limit,
  getDetail: state => state.detail
};

const actions = {
  async fetchCategory({ commit }) {
    const response = await api.getCategory();
    const category = await response.data.list.map(item => {
      return { ...item, ["checked"]: true };
    });
    commit("setCategory", category);
  },
  async fetchFeeds({ commit }) {
    const response = await api.getFeeds(
      state.page,
      state.ord,
      state.category.filter(item => item.checked).map(el => el.id),
      state.limit
    );
    commit("setFeeds", response.data.list);
  },
  async fetchAds({ commit }) {
    const response = await api.getAds(state.page, state.limit / 4);
    commit("setAds", response.data.list);
  },
  async updateOrd({ commit }, payload) {
    await commit("updateOrd", payload);
    const response = await api.getFeeds(
      state.page,
      state.ord,
      state.category.filter(item => item.checked).map(el => el.id),
      state.limit
    );
    commit("setFeeds", response.data.list);
  },
  async updatePage({ commit }) {
    await commit("updatePage", 1);
    const response1 = await api.getFeeds(
      state.page,
      state.ord,
      state.category.filter(item => item.checked).map(el => el.id),
      state.limit
    );
    commit("updateFeeds", response1.data.list);
    const response2 = await api.getAds(state.page, state.limit / 4);
    commit("updateAds", response2.data.list);
  },
  updateCategory({ commit }, payload) {
    commit("updateCategory", payload);
  },
  async fetchDetail({ commit }, payload) {
    const response = await api.getDetail(payload);
    commit("fetchDetail", response.data.info);
  }
};

const mutations = {
  setFeeds: (state, feeds) => {
    state.feeds = feeds;
  },
  setAds: (state, ads) => {
    state.ads = ads;
  },
  updatePage: (state, page) => {
    state.page += page;
  },
  updateOrd: (state, ord) => {
    state.ord = ord;
    state.page = 1;
  },
  setCategory: (state, category) => {
    state.category = category;
  },
  updateLimit: (state, limit) => {
    state.limit = limit;
  },
  updateFeeds: (state, feeds) => {
    state.feeds.data = [...state.feeds.data, ...feeds.data];
  },
  updateAds: (state, ads) => {
    state.ads.data = [...state.ads.data, ...ads.data];
  },
  updateCategory: (state, category) => {
    state.category = category;
  },
  fetchDetail: (state, detail) => {
    state.detail = detail;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
