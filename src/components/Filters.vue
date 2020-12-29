<template>
  <div class="filter-menu">
    <div>
      <p class="label-title">All sightnings:</p>
    </div>
    <div class="filters">
      <div class="filter" :class="active === 'years' ? 'right': 'left'">
        <p v-on:click="active !== 'years' ? active = 'years' : active = ''">years <span>&#10132;</span></p>
        <div class="years" :class="{visible: active === 'years'}">
          <p v-for="(y, i) in years" :key="i" class="year">
            <input type="checkbox" id="checkbox" v-model="checkedYears" :value="y">
            {{y}}
          </p>
        </div>
      </div>
      <div class="filter" :class="active === 'countries' ? 'right': 'left'">
        <p v-on:click="active !== 'countries' ? active = 'countries' : active = ''">countries <span>&#10132;</span></p>
        <div class="countries" :class="{visible: active === 'countries'}">
          <p v-for="(co, c) in countries" :key="c" class="country" :class="`${co}-color`">
            <input type="radio" id="checkbox" v-model="checkedCountry" :value="co">
            {{co}}
          </p>
        </div>
        <div class="reset" :class="{visible: active === 'countries'}">
          <p v-on:click="checkedCountry = null">reset filter</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    // checkedCountry () {
    //   this.filterCountries()
    // }
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

    .years, .countries, .reset {
      margin-left: 10px;
      display: none;

      &.visible {
        display: inline-flex;
      }

      .year, .country {
        margin-right: 10px;
      }

      .us-color {
      }

      .gb-color {
        filter: hue-rotate(130deg);
      }

      .ca-color {
        filter: hue-rotate(200deg);
      }

      .au-color {
        filter: hue-rotate(250deg);
      }

      .nan-color {
        filter: grayscale(100%);
      }

      .de-color {
        filter: hue-rotate(50deg);
      }
    }
  }
}

</style>
