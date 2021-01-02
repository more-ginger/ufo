<template>
  <g>
    <rect :width="sizes[0]" height="30" :x="0" y="0"/>
    <g v-for="(tick, t) in ticks" :key="t">
      <text :x="scale(tick) + 10" y="20">{{formatter(tick)}}</text>
      <line :x1="scale(tick)" :x2="scale(tick)" y1="0" :y2="sizes[1]" />
    </g>
  </g>
</template>

<script>
import { timeFormat } from 'd3-time-format'
export default {
  name: 'XAxis',
  props: {
    data: Array,
    scale: Function,
    sizes: Array
  },
  computed: {
    ticks () {
      return this.scale.ticks(100)
    },
    formatter () {
      return timeFormat('%B %Y')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

rect {
  fill-opacity: 0.5;
  fill: #1B0041;
}

line {
  stroke: #009777;
  stroke-dasharray: 1 2;
}

text {
  font-size: 12px;
  font-family: $titles;
  fill: #009777;
}
</style>
