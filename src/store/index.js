import Vue from 'vue'
import Vuex from 'vuex'
import { groupBy } from 'lodash'
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
    longitude: +e.longitude,
    year: +e.year
  }
}).sort()

const groupedData = groupBy(data, function (d) {
  return d.year
})

console.log(groupedData)

export default new Vuex.Store({
  state: {
    groupedData
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
