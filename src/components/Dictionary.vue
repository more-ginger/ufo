<template>
  <div class="outer-container">
    <div class="inner-container">
      <WorldMap :data="dictionary" :selectedShape="selectedShape"/>
    </div>
    <div class="map-controls">
      <div class="map-controls-inner">
        <div class="legend-list">
          <div class="single-entry" v-for="(entry, e) in dictionary" :key="e">
            <div class="single-inner">
              <img :src="require(`../assets/img/shapes/${entry.path}`)" />
              <p>
                {{ entry.shape }}
              </p>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.outer-container {
  width: 100%;
  height: calc(100vh - 65px);

  .inner-container {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }

  .map-controls {
    position: absolute;
    bottom: 2%;
    left: 1%;

    .map-controls-inner {
      border: 0.1px solid #7400ff;
      background-color: #1B0041;
      box-shadow: -5px 5px #7400ff;

      .legend-list {
        width: 310px;
        height: 240px;
        overflow-y: scroll;

        .single-entry {
          cursor: pointer;
          padding-left: 20px;
          padding-top: 20px;
          border-bottom: 1px dashed #009777;

          .single-inner {
            display: inline-flex;

            p {
              margin-top: 0;
              margin-left: 10px;
              font-size: 25px;
            }

            img {
              vertical-align: middle;
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
