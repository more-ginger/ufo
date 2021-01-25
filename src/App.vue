<template>
  <div id="app">
    <LoadingScreen v-if="isLoading" />
    <div class="content" v-else>
    <div class="bar">
      <div class="inner-bar">
        <div class="labels-container">
          <router-link to="/">
            <h3 class="title">we still believe</h3>
          </router-link>
          <div class="selectors">
            <router-link to="/dictionary">
              <h3>all shapes</h3>
            </router-link>
            <router-link to="/chronology">
              <h3>in chronological order</h3>
            </router-link>
            <router-link to="/submit">
              <img class="submit"/>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import LoadingScreen from './components/LoadingScreen.vue' // eslint-disable-line
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
  router,
  components: {
    LoadingScreen
  },
  data () {
    return {
      isLoading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>

<style lang="scss">
@import './assets/style/normalize.css';
@import './assets/style/tooltip.scss';
@import './assets/style/global.scss';
@import "vue-select/src/scss/vue-select.scss";

#app {
  ::-webkit-scrollbar {
    display: none;
  }
  background-color: #1B0041;
  color: #009777;

  .bar {
    padding-top: 5px;
    width: 100%;
    border-bottom: 1px solid #009777;

    .inner-bar {
      margin: 0 auto;
      width: 95%;
      .labels-container {
        display: inline-flex;

        .router-link-exact-active {
          h3 {
            text-decoration-line: underline;
            text-decoration-style: solid;
            text-decoration-color: #7400ff;
            text-decoration-thickness: 5px;
          }
        }

        .selectors {
          position: absolute;
          right: 2.5%;
          font-family: $titles;
          display: inline-flex;

          h3 {
            margin-left: 50px;
          }

          .submit {
            content: url("./assets/img/eye-report.png");
            margin-left: 50px;
            width: 60px;
            height: 60px;
          }

          .submit:hover {
            content: url("./assets/img/report-icon.gif");
            animation: color 2s infinite reverse ease-in-out;
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

  .style-chooser .vs__selected, .style-years .vs__selected,
  .style-chooser .vs__dropdown-option, .style-years .vs__dropdown-option,
  .style-chooser {
    color: #009777;
  }

  .style-years .vs__search {
    visibility: none;
  }

  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    margin-top: 10px;
    margin-left: 20px;
    background: #1B0041;
    border: 1px solid #009777;
    color: #009777;
    min-width: 100px;
    width: 200px;
    font-family: $paragraphs;
    font-size: 12px;
  }

  .style-years .vs__search::placeholder,
  .style-years .vs__dropdown-toggle,
  .style-years .vs__dropdown-menu {
    // margin-top: 10px;
    // margin-left: 20px;
    background: #1B0041;
    border: 1px solid #009777;
    color: #009777;
    font-family: $paragraphs;
    font-size: 12px;
  }

  .style-chooser .vs__selected-options, .style-years .vs__selected-options {
    max-height: 50%;
  }

  .style-chooser .vs__clear, .style-years .vs__clear,
  .style-chooser .vs__open-indicator, .style-years .vs__open-indicator {
    fill: #009777;
  }
}
</style>
