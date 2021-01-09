<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="introduction">
        <h1>Sightnings Dictionary</h1>
        <div class="initial-paragraph">
          <p></p>
        </div>
      </div>
      <div class="entries-container">
        <div class="entries-inner">
          <div class="single-entry" v-for="(entry, e) in dictionary" :key="e">
            <div>
              <h2>{{entry.shape}}</h2>
              <img :src="require(`../assets/img/shapes/${entry.path}`)"/>
            </div>
            <div class="comment-container">
                <WorldMap :data="dictionary"/>
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

        .single-entry {
          display: inline-flex;
          // background-color: pink;
          width: 20%;
          // height: 80vh;

          img {
            // background-color: lightblue;
            // padding: 5%;
            width: 50px;
            height: 50px;
          }

          .comment-container {
            margin-left: 5%;
            // background-color: green;
            width: 70%;

            svg {
              // background-color: blue;
            }
          }
        }
      }
    }
  }
}
</style>
