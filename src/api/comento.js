import qs from 'qs';
import axios from "axios";

const ROOT_URL =
  "https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production";
const FEED_LIST = "/api/list";
const CATEGORY_LIST = '/api/category';
const ADS_LIST = '/api/ads';
const FEED_DETAIL = '/api/view'

export default {
  getFeeds(page, ord, category, limit) {
    return axios.get(`${ROOT_URL}${FEED_LIST}`, {
      params: { page, ord, category, limit },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    });
  },
  getCategory() {
    return axios.get(`${ROOT_URL}${CATEGORY_LIST}`);
  },
  getAds(page, limit) {
    return axios.get(`${ROOT_URL}${ADS_LIST}`, {
      params: {page, limit}
    })
  },
  getDetail(id) {
    return axios.get(`${ROOT_URL}${FEED_DETAIL}`, {
      params: {id}
    })
  }
};
