<template>
  <div class="main-visualization">
    <Filters />
    <div class="innercontainer">
      <div v-for="(ev, e) in data" :key="`${e}-sight`" >
        <img
            class="glyph"
            :class="`${ev.country}-color`"
            :src="require(`../assets/img/shapes/${ev.shape}.png`)"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Filters from '../components/Filters.vue'

export default {
  name: 'Sightings',
  components: {
    Filters
  },
  computed: {
    ...mapState(['data'])
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
      display: inline-flex;
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
