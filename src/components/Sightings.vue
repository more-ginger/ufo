<template>
  <div class="main-visualization">
    <Filters />
    <div class="innercontainer">
      <div v-for="(year, y) in sightnings" :key="`${y}-sight`" @mouseleave="toggleHighlight(null, 'end')" class="year-container">
        <div
          v-for="(ev, e) in year"
          :key="`${e}-event`"
          :class="[
            {highlightImg: highlight === e},
            {noHighlight: highlight !== e && interaction === 'on' && checkedCountry === null},
            {invisible: checkedCountry !== ev.country && checkedCountry !== null },
            {visible: checkedCountry === null}
          ]"
          class="glyph-container tooltip-target"
          v-tooltip="{content: ev.time + ' / ' + ev.country + ' / ' + ev.comment, offset: 50}"
        >
            <img class="glyph"
            @mouseenter="toggleHighlight(e, 'on')"
            :class="`${ev.country}-color`"
            :src="require(`../assets/img/shapes/${ev.shape}`)"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VTooltip from 'v-tooltip'
import { mapState, mapActions } from 'vuex'
import { map } from 'lodash'
import Filters from '../components/Filters.vue'

Vue.use(VTooltip)

export default {
  name: 'Sightings',
  components: {
    Filters
  },
  data () {
    return {
      highlight: null,
      interaction: 'end'
    }
  },
  computed: {
    ...mapState(['filteredData', 'checkedCountry']),
    sightnings () {
      const { filteredData } = this
      const gifs = ['changing']

      return map(filteredData, year => {
        return map(year, d => {
          let shape = d.shape + '.png'

          if (gifs.includes(d.shape)) {
            shape = d.shape + '.gif'
          }

          return {
            shape,
            country: d.country,
            comment: d.comments,
            time: d.datetime
          }
        })
      })
    }
  },
  mounted () {
    this.filterData()
  },
  methods: {
    ...mapActions(['filterData']),
    toggleHighlight (index, active) {
      this.highlight = index
      this.interaction = active
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/style/global.scss';
@import '../assets/style/countries.scss';

.main-visualization {
  width: 95%;
  margin: 0 auto;

  .innercontainer {
    width: 100%;
    min-height: 100vh;
    padding-bottom: 10px;

    div.year-container {
      padding-top: 20px;
      // margin-bottom: 20px;
      // border-top: 1px solid #009777;

      .glyph-container {
        display: inline-flex;

        &.highlightImg {
          -webkit-transform: scale(3);
          -moz-transform: scale(3);
          -o-transform: scale(3);
          transition: transform .2s;
        }

        &.invisible {
          pointer-events: none;
          opacity: 0.1;
        }

        &.visible {
          opacity: 1;
        }

        &.noHighlight {
          opacity: 0.3;
        }

        img.glyph {
          display: inline-block;
          margin: 5px;
          width: 25px;
          height: 25px;
          transition: transform .2s;
        }

      }
    }
  }
}
</style>
