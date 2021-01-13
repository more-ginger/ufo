<template>
  <svg width="100%" height="100%" ref="vis">
    <defs>
    <clipPath id="svgPath">
      <path :d="worldShape.world"/>
    </clipPath>
    </defs>
    <g>
      <path :d="worldShape.world"/>
      <path :d="worldShape.outline" class="outline"/>
      <path :d="worldShape.graticulate" class="graticulate"/>
    </g>
    <g
      v-for="(shape, s) in mapPoints"
      :key="s" :class="shape.group"
      >
      <path
        v-for="(contour, c)
        in shape.paths"
        :key="`${c}-contour`"
        :d="contour"
        class="contour"
        />
        <!-- <g v-for="(point, p) in shape.point" :key="p">
          <circle :cx="point[0]" :cy="point[1]" r="1"/>
        </g> -->
    </g>
    <g>
    </g>
  </svg>
</template>

<script>
import { mapState } from 'vuex'
import { geoEqualEarth, geoPath, geoGraticule10, geoMercator } from 'd3-geo'
import { contourDensity } from 'd3-contour'
import { feature } from 'topojson-client'
import { map } from 'lodash'

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
      return geoEqualEarth().scale(230).translate([this.svgWidth / 2, this.svgHeight / 2]).precision(0.1)
    },
    countourProj () {
      return geoMercator().scale(190).translate([this.svgWidth / 2, this.svgHeight / 2]).precision(0.1)
    },
    pathConverter () {
      return geoPath().projection(this.projection)
    },
    noProjectionPath () {
      return geoPath()
    },
    contourPaths () {
      return map(this.contour, (c, i) => {
        return this.pathConverter(c)
      })
    },
    mapPoints () {
      return map(this.data, (d, i) => {
        const contours = this.contourGenerator(d.entries)
        const paths = map(contours, (c) => {
          return this.noProjectionPath(c)
        })

        // const projectedPoints = map(d.entries, coord => { return this.countourProj([coord.longitude, coord.latitude]) })
        // console.log('proj Points', projectedPoints)
        // const contours = this.contourNoProj(projectedPoints)
        // console.log('no proj', this.contourNoProj(d.entries))
        // console.log('proj', this.contourGenerator(d.entries))
        // const paths = map(contours, (c, i) => {
        //   return this.emptyPath(c)
        // })
        // console.log(paths)
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
        .bandwidth(10)
        .thresholds(30)
    }
  },
  mounted () {
    this.calcMapSizes()
    window.addEventListener('resize', this.calcMapSizes, false)
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
    stroke:  #7400ff;
    fill: #ff00de;
    stroke-width: 0.5;
    opacity: 0.5;
  }

  path {
    stroke:  #7400ff;
    fill: white;
    stroke-width: 0.2;

    &.contour {
      fill: #ff00de;
      stroke: white;
      fill-opacity: 0.1;
      stroke-width: 0.5;
      clip-path: url(#svgClipPathID);
    }

    &.outline {
      stroke:  #7400ff;
      fill: none;
      stroke-width: 2;
    }

    &.graticulate {
      stroke:  #7400ff;
      stroke-width: 0.5;
      fill: none;
    }
  }
}
</style>
