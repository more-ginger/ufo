<template>
  <svg width="100%" height="100%" ref="vis">
    <g>
      <path :d="worldShape.world"/>
      <path :d="worldShape.outline"/>
      <path :d="worldShape.graticulate" class="graticulate"/>
    </g>
  </svg>
</template>

<script>
import { mapState } from 'vuex'
import { geoEqualEarth, geoPath, geoGraticule10 } from 'd3-geo'
import { feature } from 'topojson-client'
import { map } from 'lodash'

export default {
  name: 'WorldMap',
  props: {
    data: Array
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
      return geoEqualEarth().scale(150).translate([this.svgWidth / 2, this.svgHeight / 2]).precision(0.1)
    },
    pathConverter () {
      return geoPath().projection(this.projection)
    },
    mapPoints () {
      return map(this.data, (d, i) => {
        return {
          point: this.projection([d.longitude, d.longitude])
          // longitude: this.projection(d.longitude)
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
      this.svgWidth = Math.max(svgWidth, 500)
      this.svgHeight = Math.max(svgHeight, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

g {
  width: inherit;
  height: inherit;

  path {
    stroke:  #009777;
    fill: none;

    &.graticulate {
      stroke-width: 0.2;
    }
  }
}
</style>
