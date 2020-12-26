<template>
  <div class="main-visualization">
    <Filters />
    <div class="innercontainer">
      <div v-for="(year, y) in sightnings" :key="`${y}-sight`" >
        <img
            v-for="(ev, e) in year"
            :key="`${e}-event`"
            class="glyph"
            :class="`${ev.country}-color`"
            :src="require(`../assets/img/shapes/${ev.shape}`)"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { map } from 'lodash'
import Filters from '../components/Filters.vue'

export default {
  name: 'Sightings',
  components: {
    Filters
  },
  computed: {
    ...mapState(['groupedData']),
    sightnings () {
      const { groupedData } = this
      const gifs = ['other', 'flash', 'changing']
      return map(groupedData, year => {
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
        width: 25px;
        height: auto;
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
    }
  }
}
</style>
