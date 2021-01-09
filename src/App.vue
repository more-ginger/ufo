<template>
  <div id="app">
    <div class="bar">
      <div class="inner-bar">
        <div class="labels-container">
          <router-link to="/"><h3 class="title">we still believe</h3></router-link>
          <div class="selectors">
            <router-link to="/dictionary"><h3>all shapes</h3></router-link>
            <router-link to="/chronology"><h3>in chronological order</h3></router-link>
            <router-link to="/submit"><img src="@/assets/img/report-icon.png"/></router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Introduction from './components/Introduction.vue'
import Streamgraph from './components/Streamgraph.vue'
import Dictionary from './components/Dictionary.vue'
import Submit from './components/Submit.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Introduction },
  { path: '/chronology', component: Streamgraph },
  { path: '/dictionary', component: Dictionary },
  { path: '/submit', component: Submit }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

export default {
  name: 'App',
  router
}
</script>

<style lang="scss">
@import './assets/style/normalize.css';
@import './assets/style/tooltip.scss';
@import './assets/style/global.scss';
@import "vue-select/src/scss/vue-select.scss";

#app {
  background-color: #1B0041;
  color: #009777;
  // width: 100%;

  .bar {
    padding-top: 5px;
    width: 100%;
    border-bottom: 1px solid #009777;

    .inner-bar {
      margin: 0 auto;
      width: 95%;
      .labels-container {
        display: inline-flex;

        .selectors {
          position: absolute;
          right: 2.5%;
          font-family: $titles;
          display: inline-flex;
          // width: 50%;

          h3 {
            margin-left: 50px;
          }

          img {
            margin-left: 50px;
            padding-top: 20px;
            width: auto;
            height: 20px;
          }
        }

        .title {
          font-family: $titles;
        }
      }
    }
  }

  .outer-container {
    width: 100%;

  }

  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    background: #1B0041;
    border: none;
    color: #009777;
    text-transform: lowercase;
    font-variant: small-caps;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #009777;
  }
}
</style>
