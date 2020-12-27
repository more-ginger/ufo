<template>
  <div class="main-visualization">
    <Filters />
    <div class="innercontainer">
      <div
        v-for="(year, y) in sightnings"
        :key="`${y}-sight`"
        @mouseleave="toggleHighlight(null, 'end')"
        >
        <img
            v-for="(ev, e) in year"
            :key="`${e}-event`"
            class="glyph"
            @mouseenter="toggleHighlight(e, 'on')"
            :class="[
              `${ev.country}-color`,
              {highlightImg: highlight === e},
              {noHighlight: highlight !== e && interaction === 'on'}
            ]"
            :src="require(`../assets/img/shapes/${ev.shape}`)"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { map } from 'lodash'
import { max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import Filters from '../components/Filters.vue'

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
    ...mapState(['filteredData']),
    durationScale () {
      const maxDuration = max(map(this.filteredData, year => { return max(map(year, d => { return d.duration })) }))
      const minDuration = min(map(this.filteredData, year => { return min(map(year, d => { return d.duration })) }))
      return scaleLinear().domain([minDuration, maxDuration]).range([0, 1])
    },
    sightnings () {
      const { filteredData } = this
      const gifs = ['other', 'flash', 'changing']
      return map(filteredData, year => {
        return map(year, d => {
          let shape = d.shape + '.png'
          if (gifs.includes(d.shape)) {
            shape = d.shape + '.gif'
          }
          return {
            shape,
            country: d.country
          }
        })
      })
    }
  },
  methods: {
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

.main-visualization {
  width: 95%;
  margin: 0 auto;

  .innercontainer {
    width: 100%;

    div {
      img.glyph {
        margin: 5px;
        width: 20px;
        height: auto;
        transition: transform .2s;
      }

      img.us-color {
      }

      img.gb-color {
        filter: hue-rotate(180deg);
      }

      img.nan-color {
        filter: hue-rotate(200deg);
      }

      img.de-color {
        filter: hue-rotate(50deg);
      }

      img.highlightImg {
        transform: scale(400%);
        transition: transform .2s;
        z-index: 2;
      }

      img.noHighlight {
        transform: scale(80%);
        opacity: 0.3;
        z-index: 1;
      }
    }
  }
}
</style>
