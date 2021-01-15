<template>
  <svg width="100%" height="98%" ref="vis">
    <g>
      <path :d="worldShape.world" class="terrain"/>
      <path :d="worldShape.outline" class="outline"/>
      <path :d="worldShape.graticulate" class="graticulate"/>
    </g>
    <g v-if="selectedSchape !== 'default'">
      <path
        v-for="(contour, c) in generalContour"
        :key="`${c}-contour`"
        :d="contour.geometry"
        :fill="`${contour.color}`"
        :stroke="`${contour.stroke}`"
        class="contour"
      />
    </g>
    <g v-if="selectedSchape === 'default'">
      <g
        v-for="(shape, s) in mapPoints"
        :key="s" :class="shape.group"
        >
        <path
          v-for="(contour, c)
          in shape.paths"
          :key="`${c}-contour`"
          :d="contour.geometry"
          class="contour"
          :fill="`${contour.color}`"
          />
          <!-- <g v-for="(point, p) in shape.point" :key="p">
            <circle :cx="point[0]" :cy="point[1]" r="1"/>
          </g> -->
      </g>
    </g>
    <g>
    </g>
  </svg>
</template>

<script>
import { mapState } from 'vuex'
import { geoPath, geoGraticule10, geoNaturalEarth1 } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import { interpolateHcl } from 'd3-interpolate'
import { rgb } from 'd3-color'
import { contourDensity } from 'd3-contour'
import { feature } from 'topojson-client'
import { map, filter } from 'lodash'

export default {
  name: 'WorldMap',
  props: {
    data: Array,
    selectedShape: String
  },
  data () {
    return {
      svgWidth: 0,
      svgHeight: 0
    }
  },
  computed: {
    ...mapState(['world']),
    projection () {
      return geoNaturalEarth1()
        .scale(240)
        .translate([this.svgWidth / 2, this.svgHeight / 2 + 10])
        .precision(0.1)
    },
    pathConverter () {
      return geoPath().projection(this.projection)
    },
    noProjectionPath () {
      return geoPath()
    },
    colorScale () {
      const domain = this.selectedShape === 'default' ? [1, 4] : [1, 2]
      return scaleLinear().domain(domain)
        .interpolate(interpolateHcl)
        .range([rgb('#007AFF'), rgb('#FFF500')])
    },
    allPoints () {
      return map(this.data, (d, i) => {
        const points = map(d.entries, (entry, e) => {
          return { longitude: entry.longitude, latitude: entry.latitude }
        })
        const flattened = points.flat()
        return flattened
      }).flat()
    },
    generalContour () {
      const { allPoints, contourGenerator, noProjectionPath, colorScale } = this
      const onlyCoords = filter(allPoints, point => { return point.latitude !== 0 & point.longitude !== 0 })
      const contours = contourGenerator(onlyCoords)
      return map(contours, (c) => {
        return {
          geometry: noProjectionPath(c),
          color: colorScale(c.value),
          stroke: c.value < 0.1 ? '#ff00de' : 'none'
        }
      })
    },
    mapPoints () {
      return map(this.data, (d, i) => {
        const onlyCoords = filter(d.entries, point => { return point.latitude !== 0 & point.longitude !== 0 })
        const contours = this.contourGenerator(onlyCoords)
        const paths = map(contours, (c) => {
          return {
            geometry: this.noProjectionPath(c),
            color: this.colorScale(c.value)
          }
        })
        return {
          group: d.shape,
          paths,
          point: map(d.entries, coord => { return this.projection([coord.longitude, coord.latitude]) })
        }
      })
    },
    worldShape () {
      const { world, pathConverter } = this
      const outline = { type: 'Sphere' }
      const graticulate = geoGraticule10()
      const land = feature(world, world.objects.land)
      return {
        world: pathConverter(land),
        graticulate: pathConverter(graticulate),
        outline: pathConverter(outline)
      }
    },
    contourGenerator () {
      return contourDensity()
        .x((d) => this.projection([d.longitude, d.latitude])[0])
        .y((d) => this.projection([d.longitude, d.latitude])[1])
        .bandwidth(5)
        .thresholds(200)
        .size([this.svgWidth, this.svgHeight])
    }
  },
  mounted () {
    this.calcMapSizes()
    window.addEventListener('resize', this.calcMapSizes, false)
    console.log(this.generalContour)
  },
  updated () {
    this.calcMapSizes()
  },
  // beforeDestroy () {
  //   this.calcMapSizes()
  //   window.removeEventListener('resize', this.calcMapSizes, false)
  // },
  methods: {
    calcMapSizes: function () {
      const { vis: el } = this.$refs
      const svgWidth = el.clientWidth
      const svgHeight = el.clientHeight || el.parentNode.clientHeight
      this.svgWidth = Math.max(svgWidth, 50)
      this.svgHeight = Math.max(svgHeight, 50)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';
g {
  // width: inherit;
  // height: inherit;

  circle {
    fill: #009777;
    stroke: none;
  }

  .contour {
    // fill: #ff00de;
    // stroke: none;
    fill-opacity: 0.1;
    stroke-width: 0.5;
    stroke-dasharray: 1 1;
  }

  path {
    // stroke:  #7400ff;
    // stroke-width: 0.2;

    &.terrain {
      stroke:  #7400ff;
      fill: #3a0087;
      stroke-width: 0.1;
    }

    &.outline {
      stroke:  #7400ff;
      fill: none;
      stroke-width: 1;
    }

    &.graticulate {
      stroke:  #7400ff;
      stroke-width: 0.2;
      stroke-dasharray: 4 2;
      fill: none;
    }
  }
}
</style>
