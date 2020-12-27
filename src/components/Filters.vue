<template>
  <div class="filter-menu">
    <div>
      <p class="label-title">All sightnings:</p>
    </div>
    <div class="filters">
      <p class="filter" :class="active ? 'right': 'left'" v-on:click="active = !active">years
        <span>&#10132;</span>
      </p>
      <div class="years" :class="{visible: active === true}">
        <p v-for="(y, i) in years" :key="i" class="year">
          <input type="checkbox" id="checkbox" v-model="checkedYears" :value="y">
          {{y}}
        </p>
      </div>
      <p class="filter">countries &#10132;</p>
      <p class="filter">duration &#10132;</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Filters',
  data () {
    return {
      active: false
      // checkedYears: []
    }
  },
  computed: {
    ...mapState(['years']),
    checkedYears: {
      get () {
        return this.$store.state.checkedYears
      },
      set (value) {
        this.$store.commit('FILTER_YEARS', value)
      }
    }
  },
  methods: {
    ...mapActions([
      'filterData'
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
  border-bottom: 1px solid #009777;
  background-color: #1B0041;
  margin-bottom: 2%;
  display: inline-flex;
  position: sticky;
  top: 0;
  z-index: 1;

  .filters {
    margin: 0 10px;
    display: inline-flex;

    .filter {
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

    }

    .years {
      display: none;

      &.visible {
        display: inline-flex;
      }

      .year {
        margin-right: 10px;
      }
    }
  }
}

</style>
