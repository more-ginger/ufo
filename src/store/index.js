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
}).sort(function (a, b) {
  return Date.parse(a.datetime) - Date.parse(b.datetime)
})

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
    checkedYears: ['2010'],
    checkedCountry: null
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
    // filterCountries ({ state, commit, dispatch }) {
    //   let filtered = {}
    //   dispatch('filterData')
    //
    //   if (state.checkedCountry !== null) {
    //     forEach(state.filteredData, (year, i) => {
    //       filtered[i] = filter(year,
    //         function (d) {
    //           return d.country === state.checkedCountry
    //         })
    //     })
    //   } else { filtered = state.filteredData }
    //
    //   commit('FILTER_DATA', filtered)
    // }
  },
  modules: {
  }
})
