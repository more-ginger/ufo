<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="text-paragraph">
        <div class="inner-text">
          <h3>
            Timeline of Encounters
          </h3>
           <h5>(Jan'2017 / Dec' 2020)</h5>
          <p class="directions">
            Scroll right to move forward in time. Select a category by hovering
            directly on the chart or choosing a shape.
          </p>
          <p class="summary">
            We note that encounters that describe
            <span style="color:rgb(58, 197, 203);">lights</span> appear most frequently,
            followed by <span style="color:rgb(93, 162, 207);">
            circles</span> and <span style="color:rgb(81, 174, 206);">formations</span>.
            It’s of course unclear what people actually saw, and our references are limited to those included in the
            NUFORC database. The most prominent patterns emerge by focusing on
            the precise dates; sightings seem to spike around US national holidays -
            Independence Day Weekend in July, Halloween in October, Thanksgiving
            weekend in November, or Christmas Time.
            <br/><br/>
            Then, in 2020, the pandemic hits, and sightings nearly double!
            Reports describe even more elaborate shapes flying through the air.
            This begins at the start of March through to the end of April,
            when things settle down again. It’s difficult to pinpoint the exact reason -
            loneliness in lockdown, an increase in media coverage of the topic in 2020 -
            but the timing of the  increase is notable.
          </p>
        </div>
      </div>
      <svg ref="vis">
        <line x1="0" :x2="svgWidth" :y1="svgHeight / 2" :y2="svgHeight / 2" />
        <g class="paths">
          <g
            v-for="(ar, a) in area"
            :key="a"
            :class="{
              activePath: activeShape === ar.id,
              inactivePath: activeShape !== ar.id & activeShape !== ''
              }">
              <path
              :d="ar.area"
              :fill="ar.color"
              @mouseenter="toggleColor(ar.id)" @mouseleave="toggleColor('')"
              />
          </g>
        </g>
        <g class="axis">
          <XAxis :data="newData" :scale="x" :sizes="[svgWidth, svgHeight]"/>
        </g>
      </svg>
      <div class="legend-container">
        <div class="legend-inner">
          <div class="shapes">
            <p
              v-for="(key, k) in keys"
              :key="k"
              :style="`color: ${activeShape !== area[k].id & activeShape !== '' ? 'white': area[k].color};`"
              :class="
                [area[k].id,
                {
                  activeLabel: activeShape === area[k].id,
                  inactiveLabel:activeShape !== area[k].id & activeShape !== ''
                  }]"
              @click="toggleColor(area[k].id)"
            >
              {{ key }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { map } from 'lodash'
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
      },
      activeShape: ''
    }
  },
  computed: {
    ...mapState(['data', 'keys']),
    parser () { return d3.timeParse('%Y-%m-%d') },
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
      const domain = [parser('2016-12-25'), parser('2020-12-31')]
      const range = [this.margins.left, this.svgWidth - this.margins.right * 2]
      return d3.scaleTime().domain(domain).range(range)
    },
    y () {
      const domain = [-50, 50]
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
    stackedData () {
      const { stacker, nested } = this
      return stacker(nested)
    },
    area () {
      const { areaGenerator, stackedData } = this
      return map(stackedData, (group, i) => {
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
    },
    toggleColor (value) {
      if (this.activeShape !== value) {
        this.activeShape = value
      } else {
        this.activeShape = ''
      }
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
  overflow-y: hidden;
  white-space: nowrap;

  .inner-container {

    display: inline-flex;
    width: 1100vw;
    height: 92vh;

    .text-paragraph {
      border-right: 1px solid #009777;
      width: 3%;
      height: 100%;

      .inner-text {

        h3 {
          margin-bottom: 10px;
        }
        h5 {
          font-family: $titles;
          margin-top: 0px;
        }

        overflow-y: visible;
        padding: 10px;
        font-family: $paragraphs;
        white-space: normal;
        width: 80%;
        height: 65%;
        padding-left: 35px;

        .directions {
            // color: #7400ff;
          border-left: 1px solid #009777;
          margin-top: 30px;
          padding-left: 10px;
          font-size: 12px;
          font-style: italic;
        }

        .summary {
          margin-top: 20px;
          height: 100%;
          overflow-y: scroll;
        }
        // overflow-y: hidden;
      }
    }

    svg {
      width: 98%;
      height: 100%;
      background-color: #1B0041;

      line {
        stroke: #009777;
      }

      .inactivePath {
        path {
          fill: white;
        }
      }

      .activePath {
        path {
          opacity: 1;
        }
      }

      path {
        stroke-width: 0.3;
        stroke: #1B0041;
      }
    }

    .legend-container {
      width: 100%;
      white-space: wrap;
      bottom: 0;
      position: absolute;
      background-color: rgba(27, 0, 65, 0.9);
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
          display: flex;
          flex-flow: row wrap;
          align-content: space-between;

          p {
            cursor: pointer;
            font-size: 14px;
            margin-right: 0.8%;

            &.activeLabel {
              font-style: oblique;
              text-decoration: underline;
            }

            &.inactiveLabel {
              color: white;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1000px) {
  .outer-container {
    .inner-container {
      height: 94vh;
      .legend-container {
        .legend-inner {
          h3 {
            margin-top: 15px;
          }

          .shapes {
            p {
              margin-right: 10px;
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}

</style>
