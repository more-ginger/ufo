<template>
  <div class="outer-container">
    <div class="inner-container">
      <svg ref="vis">
        <line x1="0" :x2="svgWidth" :y1="svgHeight / 2" :y2="svgHeight / 2" />
        <g class="paths">
          <g v-for="(ar, a) in area" :key="a">
            <path :d="ar.area" :fill="ar.color"/>
          </g>
        </g>
        <XAxis :data="newData" :scale="x" :sizes="[svgWidth, svgHeight]"/>
      </svg>
      <div class="legend-container">
        <div class="legend-inner">
          <div class="shapes">
            <p v-for="(key, k) in keys" :key="k" :class="area[k].id">
              {{ key }}
            </p>
          </div>
          <h3>Sighted UFOs according to shape (Jan'2010 / Apr' 2014)</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { map, uniq } from 'lodash'
import * as d3 from 'd3'
import * as d3Collection from 'd3-collection'
import { traverseAndFlatten } from '@/assets/js/utilities.js'
import XAxis from './graph/XAxis.vue'

export default {
  name: 'Streamgraph',
  components: {
    XAxis
  },
  data () {
    return {
      svgWidth: 0,
      svgHeight: 0,
      margins: {
        left: 30,
        right: 30
      }
    }
  },
  computed: {
    ...mapState(['data']),
    parser () { return d3.timeParse('%Y-%m-%d') },
    keys () { return uniq(map(this.data, (d) => { return d.shape })) },
    newData () {
      return map(this.data, d => {
        const date = d.datetime.split(' ')
        d.datetime = date[0]
        return d
      })
    },
    nested () {
      const { newData } = this
      const nested = d3Collection.nest()
        .key(function (d) { return d.datetime })
        .key(function (d) { return d.shape })
        .rollup(function (ids) {
          return ids.length
        }).entries(newData).map(function (d) {
          return { datetime: d.key, value: d.values }
        })

      return traverseAndFlatten(nested, this.keys)
    },
    stacker () {
      const { keys } = this
      return d3.stack()
        .keys(keys)
        .offset(d3.stackOffsetSilhouette)
        .order(d3.stackOrderAscending)
    },
    x () {
      const { parser } = this
      const domain = [parser('2010-01-01'), parser('2014-05-08')]
      const range = [this.margins.left, this.svgWidth - this.margins.right * 2]
      return d3.scaleTime().domain(domain).range(range)
    },
    y () {
      const domain = [-40, 40]
      const range = [this.svgHeight, 0]
      return d3.scaleLinear().domain(domain).range(range)
    },
    color () {
      const { keys } = this
      return d3.scaleLinear().domain([0, keys.length]).range(['#00ffc6', '#ff00de'])
    },
    areaGenerator () {
      const { x, y } = this
      return d3.area()
        .x(d => x(this.parser(d.data.datetime)))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
        .curve(d3.curveStep)
    },
    area () {
      const { areaGenerator, stacker, nested } = this
      const data = stacker(nested)
      return map(data, (group, i) => {
        return {
          id: this.keys[i],
          area: areaGenerator(group),
          color: this.color(i)
        }
      })
    }
  },
  mounted () {
    this.calcSizes()
    window.addEventListener('resize', this.calcSizes, false)
    console.log(this.area)
  },
  updated () {
    this.calcSizes()
  },
  beforeDestroy () {
    this.calcSizes()
    window.removeEventListener('resize', this.calcSizes, false)
  },
  methods: {
    calcSizes: function () {
      const { vis: el } = this.$refs
      const svgWidth = el.clientWidth
      const svgHeight = el.clientHeight || el.parentNode.clientHeight
      this.svgWidth = Math.max(svgWidth, 500)
      this.svgHeight = Math.max(svgHeight, 500)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

.outer-container {
  width:100%;
  overflow-x: auto;
    white-space: nowrap;
  .inner-container {
    height: 92vh;

    svg {
      width: 1100%;
      height: 100%;
      background-color: #1B0041;

      line {
        stroke: #009777;
      }

      path {
        stroke-width: 0.3;
        stroke: #1B0041;
      }
    }

    .legend-container {
      width: 100%;
      bottom: 0;
      position: absolute;
      background-color: rgba(27, 0, 65, 0.5);
      border-top: 1px solid #009777;

      .legend-inner {
        width: 95%;
        margin: 0 auto;

        h3 {
          font-family: $titles;
          font-size: 12px;
          margin: 0px 0px 20px 0px;
        }
        // display: inline-flex;

        .shapes {
          display: inline-flex;
          p {
            cursor: pointer;
            font-size: 14px;
            margin-right: 0.8%;

            &.formation {
              color: rgb(0, 255, 198);
            }

            &.light {
              color: rgb(12, 243, 199);
            }

            &.other {
              color: rgb(23, 232, 200);
            }

            &.sphere {
              color: rgb(35, 220, 201);
            }

            &.sphere {
              color: rgb(35, 220, 201);
            }

            &.triangle {
              color: rgb(46, 209, 202);
            }

            &.circle {
              color: rgb(58, 197, 203);
            }

            &.diamond {
              color: rgb(70, 185, 205);
            }

            &.fireball {
              color: rgb(81, 174, 206);
            }

            &.oval {
              color: rgb(93, 162, 207);
            }

            &.disk {
              color: rgb(104, 151, 208);
            }

            &.unknown {
              color: rgb(116, 139, 209);
            }

            &.chevron {
              color: rgb(128, 128, 210);
            }

            &.nan {
              color: rgb(139, 116, 211);
            }

            &.changing {
              color: rgb(151, 104, 212);
            }

            &.rectangle {
              color: rgb(162, 93, 213);
            }

            &.cross {
              color: rgb(174, 81, 214);
            }

            &.circle {
              color: rgb(58, 197, 203);
            }

            &.flash {
              color: rgb(185, 70, 215);
            }

            &.cigar {
              color: rgb(197, 58, 217);
            }

            &.teardrop {
              color: rgb(209, 46, 218);
            }

            &.cylinder {
              color: rgb(220, 35, 219);
            }

            &.egg {
              color: rgb(232, 23, 220);
            }

            &.cone {
              color: rgb(243, 12, 221);
            }
          }
        }
      }
    }
  }
}
</style>
