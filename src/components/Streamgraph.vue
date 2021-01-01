<template>
  <div class="outer-container">
    <div class="inner-container">
      <svg ref="vis">
        <g v-for="(ar, a) in area" :key="a">
          <path :d="ar.area" :fill="ar.color"/>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { map, uniq } from 'lodash'
import * as d3 from 'd3'
import * as d3Collection from 'd3-collection'
import { traverseAndFlatten } from '@/assets/js/utilities.js'

export default {
  name: 'Streamgraph',
  data () {
    return {
      svgWidth: 0,
      svgHeight: 0
    }
  },
  computed: {
    ...mapState(['data']),
    parser () { return d3.timeParse('%Y-%m-%d') },
    keys () { return uniq(map(this.data, (d) => { return d.shape })) },
    nested () {
      const newData = map(this.data, d => {
        const date = d.datetime.split(' ')
        d.datetime = date[0]
        return d
      })
      const nested = d3Collection.nest()
        .key(function (d) { return d.datetime })
        .key(function (d) { return d.shape })
        .rollup(function (ids) {
          return ids.length
        }).entries(newData).map(function (d) {
          return { datetime: d.key, value: d.values }
        })

      return traverseAndFlatten(nested)
    },
    stacker () {
      const { keys } = this
      return d3.stack()
        .keys(keys)
        .offset(d3.stackOffsetSilhouette)
        .order(d3.stackOrderDescending)
    },
    x () {
      const { parser } = this
      const domain = [parser('2010-01-01'), parser('2014-05-08')]
      const range = [0, this.svgWidth]
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
    },
    area () {
      const { areaGenerator, stacker, nested } = this
      const data = stacker(nested)
      return map(data, (group, i) => {
        return {
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
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.outer-container {
  width:100%;
  overflow-x: auto;
    white-space: nowrap;
  .inner-container {
    height: 92vh;

    svg {
      width: 700%;
      height: 100%;
      background-color: #1B0041;
    }
  }
}
</style>
