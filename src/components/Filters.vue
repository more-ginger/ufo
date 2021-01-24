<template>
  <div class="filter-menu">
    <div>
      <p class="label-title">All sightnings (2017 - 2020)</p>
    </div>
    <div class="filters">
      <div class="filter">
        <div class="years">
          <v-select class="style-years" :options="years" v-model="checkedYears"></v-select>
        </div>
      </div>
      <div class="filter">
        <p v-on:click="active !== 'countries' ? active = 'countries' : active = ''">country:</p>
        <div class="countries">
          <v-select class="style-chooser" :options="countries" v-model="checkedCountry"></v-select>
          <p class="Africa-color">Africa</p>
          <p class="Asia-color">Asia</p>
          <p class="Europe-color">Europe</p>
          <p class="NAmerica-color">N. America</p>
          <p class="Oceania-color">Oceania</p>
          <p class="SAmerica-color">S. America</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

export default {
  name: 'Filters',
  data () {
    return {
      active: ''
    }
  },
  computed: {
    ...mapState(['years', 'countries']),
    checkedYears: {
      get () {
        return this.$store.state.checkedYears
      },
      set (value) {
        this.$store.commit('FILTER_YEARS', value)
      }
    },
    checkedCountry: {
      get () {
        return this.$store.state.checkedCountry
      },
      set (value) {
        this.$store.commit('FILTER_COUNTRIES', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'filterData',
      'filterCountries'
    ])
  },
  watch: {
    checkedYears () {
      this.filterData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/style/global.scss';

.filter-menu {
  width: 100%;
  background-color: #1B0041;
  margin-bottom: 2%;
  display: inline-flex;
  position: sticky;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #009777;

  .label-title {
    font-family: $titles;
  }

  .filters {
    margin: 0 10px;
    display: inline-flex;

    .filter {
      display: inline-flex;
      margin: auto 10px;
      cursor: pointer;

      &.right {
        span {
          display: inline-block;
          vertical-align: middle;
          transition: transform .5s;
        }
      }

      &.left {
        span {
          -webkit-transform:rotate(180deg);
          -moz-transform:rotate(180deg);
          -o-transform:rotate(180deg);
          display: inline-block;
          vertical-align: middle;
          transition: transform .5s;
        }
      }

      .reset {
        cursor: pointer;
      }

    }

    .filter {
      padding-left: 20px;
    }

    .countries {
      display: inline-flex;
      p {
        margin-top: 18px;
        margin-left: 20px;
        font-size: 12px;
      }
    }

    .years, .reset {
      margin-left: 0px;
      // display: none;

      &.visible {
        display: inline-flex;
      }
    }
  }
}

</style>
