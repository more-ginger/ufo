<template>
  <div class="outer-container">
    <div  @click="activeOverlay = !activeOverlay">Activate text</div>
    <div class="text-paragraph" :class="{'slide': activeOverlay}">
      <div class="inner-text">
        An unidentified flying object (UFO) is any aerial phenomenon that
        cannot immediately be identified or explained. From the beginning of
        1900 <span>more than 80.000 UFOs sightings have been reported</span>.
        In August 2020 the Pentagon decided to form a new body to monitor these
        mysterious events <span><a href="https://www.theguardian.com/us-news/2020/aug/15/us-department-defense-ufo-taskforce">(source)</a></span>.
        I decided to visualize them, starting from 2010. Each sightning is represented
        as a glyph, based on the shape of these mysterious flying objects: blinking lights,
        crosses, cylinders, mutable structures are just some of the weird thigs reported. Some
        entries even have comments and testimonies describing the event and the object in detail.
        Some others are crooked and incomplete. Here each one of them can be browsed and geo-located.
        <span>We still believe. We want to believe. We are not alone in this universe.</span>
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
// eslint-disable
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
      activeOverlay: true
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
        return a - b
      })
    }
  },
  mounted () {
    this.activeOverlay = false
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
    left: -30%;
    transition: left 1s;
    .inner-text {
      font-family: $paragraphs;
      background: white;
      box-shadow: 5px 5px #f0f;
      width: 300px;
      height: 70vh;
      margin-left: 10px;
      margin-bottom: 15px;
      // bottom: 10px;
      padding: 10px;
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
              // margin-top: 0;
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
</style>
