<template>
  <div id="app">
    <Introduction />
    <Sightings />
  </div>
</template>

<script>
import Introduction from './components/Introduction.vue'
import Sightings from './components/Sightings.vue'

export default {
  name: 'App',
  components: {
    Introduction,
    Sightings
  }
}
</script>

<style lang="scss">
@import './assets/style/normalize.css';
@import './assets/style/tooltip.scss';
@import './assets/style/global.scss';

#app {
  // background-image: linear-gradient(0deg, #74638C 0%, #664398 0%, #1B0041 84%);
  background-color: #1B0041;
  color: #009777;
}
</style>
