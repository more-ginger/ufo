<template>
  <div class="outer-container">
    <div class="inner-container">
      <!-- <div class="introduction">
        <h1>Sightnings Dictionary</h1>
        <div class="initial-paragraph">
          <p></p>
        </div>
      </div> -->
      <div class="entries-container">
        <div class="entries-inner">
          <!-- <div class="single-entry">
            <div
              class="single-inner"
              v-for="(entry, e) in dictionary"
              :key="e"
              @click="selectedShape = entry.shape"
            >
              <div class="title" :class="{selected: selectedShape === entry.shape}">
                <h3>
                  <img :src="require(`../assets/img/shapes/${entry.path}`)"/>
                  {{entry.shape}}
                </h3>
              </div>
            </div>
          </div> -->
        <div class="map-container">
            <WorldMap :data="dictionary" :selectedShape="selectedShape" />
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
      selectedShape: 'unknown'
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
  .inner-container {
    .introduction {
      width: 90%;
      margin: 0 auto;
    }

    .entries-container {
      width: 90%;
      margin: 0 auto;

      .entries-inner {
        width: 100%;
        height: 90vh;
        padding-bottom: 15px;
        display: inline-flex;

        .margin-inner {
          border-top: 1px solid #7400ff;
          border-bottom: 1px solid #7400ff;
          margin: 0 auto;
          margin-top: 70px;
          width: 15%;
          height: 63vh;
          overflow-y: scroll;

          .single-entry {
            cursor: pointer;
            .title {
              padding: 0;
              margin: 0 auto;

              &.selected {
                filter: hue-rotate(250deg);
              }

              h3 {
                margin: 0;
              }
              img {
                vertical-align: middle;
                margin-right: 10px;
                width: 30px;
                height: 30px;
              }

            }
          }
        }
        .map-container {
          width: 100%;
        }
      }
    }
  }
}
</style>
