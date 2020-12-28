import Vue from 'vue'
import Vuex from 'vuex'
import { groupBy, uniq } from 'lodash'
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

const years = uniq(data.map(d => { return d.year.toString() }))

const countries = uniq(data.map(d => { return d.country }))

export default new Vuex.Store({
  state: {
    data,
    groupedData,
    years,
    countries,
    filteredData: groupedData,
    checkedYears: [2010],
    checkedCountries: countries
  },
  mutations: {
    FILTER_YEARS (state, value) {
      state.checkedYears = value
    },
    FILTER_DATA (state, value) {
      state.filteredData = value
    }
  },
  actions: {
    filterData ({ state, commit, rootState }) {
      const raw = state.groupedData
      const showed = state.checkedYears

      const filtered = Object.keys(raw)
        .filter(key => showed.includes(key))
        .reduce((obj, key) => {
          obj[key] = raw[key]
          return obj
        }, {})

      commit('FILTER_DATA', filtered)
    }
  },
  modules: {
  }
})
