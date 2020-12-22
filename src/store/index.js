import Vue from 'vue'
import Vuex from 'vuex'
// import { descending } from 'd3-array'
import events from 'dsv-loader!@/assets/data/converted.csv' // eslint-disable-line import/no-webpack-loader-syntax

Vue.use(Vuex)

const data = events.map(e => {
  return {
    comments: e.comments,
    country: e.country,
    datetime: e.datetime,
    duration: +e['duration (seconds)'],
    shape: e.shape,
    latitude: +e.latitude,
    longitude: +e.longitude
  }
}).sort()

export default new Vuex.Store({
  state: {
    data
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
