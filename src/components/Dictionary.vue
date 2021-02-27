<template>
  <div class="outer-container">
    <div class="text-paragraph" :class="{'slide': activeOverlay}">
      <div class="inner-text">
        <div class="paragraph-text">
          <h3>
            Global Encounters (2017 – 2020)
          </h3>
          <p class="directions">
            This view only represents dataset entries with valid coordinates.
            Invalid or missing locations have been removed. Please note you are
            looking only at a portion of the entire dataset. By scrolling
            through available shapes on the right side of the screen and selecting
            them you can see how similar sightings are distributed around the world.
          </p>
          <p>
            Since our data only comes from NUFORC, an organization based out of
            Washington DC, it is course biased toward entries from North America.
            It should be noted that similar record-keeping bodies have been set
            up by governments around the world (the UK’s Ministry of Defense just
            released its files this year). There’s also a significant cultural and
            linguistic bias to consider when it comes to submissions. NUFORC has
            received the most entries from coastal areas where population density
            and light pollution are both high relative to other parts of the country.
            Europe could also be considered a large hotspot, particularly Spain,
            Italy, Germany, and the Balkans. If we filter by shape, the hotspots
            shift. We also noticed that shapes marked ‘unknown’ are quite common,
            perhaps due to the labeling process upon submission. Triangles seem to
            be recorded across the globe, particularly in South America, Australia,
            and Africa.
          </p>
        </div>
        <div  @click="activeOverlay = !activeOverlay" class="activator">
          <p>
            [X] Where is more likely to spot an UFO?
          </p>
        </div>
      </div>
    </div>
    <div class="inner-container">
      <WorldMap :data="dictionary" :selectedShape="selectedShape"/>
    </div>
    <div class="map-controls">
      <div class="map-controls-inner">
        <div class="legend-list">
          <div class="single-entry" v-for="(entry, e) in dictionary" :key="e">
            <div
              class="single-inner"
              @click="changeSelection(entry.shape)"
              :class="{active: selectedShape === entry.shape}">
              <p>
                {{ entry.shape }}
              </p>
              <img :src="require(`../assets/img/shapes/${entry.path}`)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { groupBy, map } from 'lodash'
import WorldMap from './graph/Map.vue'

export default {
  name: 'Dictionary',
  components: {
    WorldMap
  },
  data () {
    return {
      selectedShape: 'default',
      activeOverlay: false
    }
  },
  computed: {
    ...mapState(['data', 'keys']),
    shapes () {
      return groupBy(this.data, function (d) { return d.shape })
    },
    dictionary () {
      return map(this.shapes, (group, g) => {
        return {
          shape: g,
          path: g !== 'changing' ? g + '.png' : g + '.gif',
          entries: map(group, (d, i) => {
            return {
              longitude: d.longitude,
              latitude: d.latitude,
              comment: d.comments
            }
          })
        }
      }).sort(function (a, b) {
        if (a.shape < b.shape) { return -1 }
        if (a.shape > b.shape) { return 1 }
        return 0
      })
    }
  },
  methods: {
    changeSelection (current) {
      if (current === this.selectedShape) {
        this.selectedShape = 'default'
      } else if (current !== 'default') {
        this.selectedShape = current
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

.outer-container {
  width: 100%;
  height: calc(100vh - 63px);

  .text-paragraph {
    &.slide {
      left: 0%;
      transition: left 1s;
    }
    z-index:1;
    position: absolute;
    left: -385px;
    transition: left 1s;
    .inner-text {
      font-family: $paragraphs;
      background: rgba(27, 0, 65, 0.7);
      border-right: 1px solid #009777;
      width: 400px;
      height: calc(100vh - 70px);
      padding-left: 10px;
      padding-right: 10px;

      display: inline-flex;

      .activator {
        border-left: 1px solid #009777;
        padding-left: 10px;
        padding-right: 15px;
        margin-left: 10px;
        cursor: pointer;

        p {
          font-family: $titles;
          transform: rotate(90deg);
          text-align: left;
          transform-origin: bottom;
          width: 0;
          margin: 0;
          white-space: nowrap;
        }
      }

      .paragraph-text {
        .directions {
          color: #7400ff;
          border-left: 1px solid #7400ff;
          margin-top: 30px;
          padding-left: 10px;
          font-size: 12px;
          font-style: italic;
        }

      }
    }
  }

  .inner-container {

    &.overlay-active {
      filter: blur(4px);
    }

    margin: 0 auto;
    width: 100%;
    height: 100%;
  }

  .map-controls {
    overflow: hidden;
    position: absolute;
    bottom: 2%;
    right: 1%;

    &.overlay-active {
      filter: blur(4px);
    }

    .map-controls-inner {
      position: relative;

      .legend-list {
        width: 140px;
        height: 680px;
        overflow-y: scroll;

        .single-entry {
          cursor: pointer;
          padding-right: 10px;
          padding-top: 10px;
          text-align: right;

          .single-inner {
            display: inline-flex;

            &.active {
              filter: hue-rotate(250deg);
            }

            p {
              visibility: hidden;
              margin-right: 10px;
              font-size: 12px;
            }

            img {
              border-bottom: 1px dashed #009777;
              padding-bottom: 10px;
              vertical-align: middle;
              width: 35px;
              height: 35px;
            }
          }
        }

        .single-entry:hover {
          p {
            visibility: visible;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1000px) {
  .outer-container {
    .map-controls {
      top: 8%;
      bottom: 0%;
    }
  }
}

</style>
