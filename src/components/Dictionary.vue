<template>
  <div class="outer-container">
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
      selectedShape: 'default'
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
.outer-container {
  width: 100%;
  height: calc(100vh - 63px);

  .inner-container {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }

  .map-controls {
    overflow: hidden;
    position: absolute;
    bottom: 2%;
    right: 1%;

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
