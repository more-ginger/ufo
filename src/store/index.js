import Vue from 'vue'
import Vuex from 'vuex'
import { groupBy, uniq } from 'lodash'
import list from 'dsv-loader!@/assets/data/list.csv' // eslint-disable-line import/no-webpack-loader-syntax
import events from 'dsv-loader!@/assets/data/sightnings_with_coords.csv' // eslint-disable-line import/no-webpack-loader-syntax
import world from '@/assets/data/world.json'

Vue.use(Vuex)

const data = events.map(e => {
  // console.log(e.shape, e.comments)
  return {
    comments: e.comment,
    country: e.country,
    datetime: e.datetime,
    shape: e.shape,
    latitude: +e.latitude,
    longitude: +e.longitude,
    year: +e.year
  }
}).sort(function (a, b) {
  return Date.parse(a.datetime) - Date.parse(b.datetime)
})

const groupedData = groupBy(data, function (d) {
  return d.year
})

const years = uniq(data.map(d => { return d.year.toString() }))
const keys = uniq(data.map(d => { return d.shape }))
const countries = uniq(data.map(d => { return d.country })).sort(function (a, b) {
  if (a < b) { return -1 }
  if (a > b) { return 1 }
  return 0
})

export default new Vuex.Store({
  state: {
    list: groupBy(list, 'Category'),
    world,
    data,
    groupedData,
    years,
    countries,
    keys,
    filteredData: groupedData,
    checkedYears: ['2020'],
    checkedCountry: null,
    viewportWidth: 0
  },
  mutations: {
    FILTER_YEARS (state, value) {
      state.checkedYears = value
    },
    FILTER_DATA (state, value) {
      state.filteredData = value
    },
    FILTER_COUNTRIES (state, value) {
      state.checkedCountry = value
    },
    CALC_WIDTH (state, width) {
      state.viewportWidth = width
    }

  },
  actions: {
    filterData ({ state, commit, rootState }) {
      const raw = state.groupedData
      const showed = state.checkedYears

      const filtered = Object.keys(raw).sort()
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
