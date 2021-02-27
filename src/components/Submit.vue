<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="introduction">
        <img src="../assets/img/shapes/flare.png"/>
        <h1>More close encounters</h1>
        <div class="initial-paragraph">
          <p class="introduction-text">
            This tiny fingers exercise is done purely for fun, with no other
            intention apart from exploring a bizzare corner of the internet. There
            are dozen of websites, sources, blogs and people out there passionate
            about UFOs. The cultural impact of UFOs is huge too. Here's some (really personal) historically
            ordered lists with references: movies, music and books to become obsessed by aliens.
          </p>
          <div class="list-wrapper">
            <p class="title">Read</p>
            <div v-for="(read,r) in list.Read" :key="r" class="list-inner">
              <p class="first-element">{{read.Year}}</p>
              <p class="second-element">{{read.Title}}</p>
              <p class="third-element">{{read.Artist}}</p>
            </div>
          </div>
          <div class="list-wrapper">
            <p class="title">Listen</p>
            <div v-for="(listen,l) in list.Listen" :key="l" class="list-inner">
              <p class="first-element">{{listen.Year}}</p>
              <p class="second-element">{{listen.Title}}</p>
              <p class="third-element">{{listen.Artist}}</p>
            </div>
          </div>
          <div class="list-wrapper">
            <p class="title">Watch</p>
            <div v-for="(watch,w) in list.Watch" :key="w" class="list-inner">
              <p class="first-element">{{watch.Year}}</p>
              <p class="second-element">{{watch.Title}}</p>
              <p class="third-element">{{watch.Artist}}</p>
            </div>
          </div>
        </div>
        <div class="data">
          <img src="../assets/img/shapes/cross.png"/>
          <h1>Data</h1>
          <p class="introduction-text">
            The original data have been scraped from the NUFORC website.
            You can find the ipynb notebooks in the project's repo.
            If you are interested NUFORC archivists also publish detailed reports about special
            sightnings. Thanks to <span><a href="https://github.com/planetsig/ufo-reports">planetsig</a></span>
            on GitHub for inspiring us with his work and
            <span><a href="https://github.com/Akshat-Pant/Web-scraper-nuforc.org">Akshat Pant</a></span>
            for providing a simple example of how to scrape the NUFORC website.
          </p>
        </div>
        <div class="data">
          <img src="../assets/img/shapes/diamond.png"/>
          <h1>Team</h1>
          <p class="introduction-text">
            <ul>
              <li>Francesca Morini / concept, design and code</li>
              <li>Zoe Cooper / copy, research</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Submit',
  computed: {
    ...mapState(['list'])
  },
  mounted () {
    console.log(this.list)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

.outer-container {
  .inner-container {
    .introduction {
      width: 50%;
      min-height: 90vh;
      margin: 0 auto;
      padding-bottom: 100px;
      padding-top: 5%;

      img {
        width: 50px;
      }
      .list-wrapper {
        // border-top: 1px solid #009777;
        margin: 5% auto;
        padding: 2% 0%;

        .title {
          text-transform: uppercase;
          font-family: $titles;
        }

        .list-inner {
          width: 100%;
          // background-color: pink;
          margin: 5px 0px;
          display: inline-flex;
          border-bottom: 1px solid #009777;
          vertical-align: middle;

          .first-element {
            width: 10%;
            vertical-align: middle;
            // background-color: lightblue;
            // margin-right: 10px;
          }

          .second-element {
            // background-color: lightgreen;
            width: 60%;
          }

          .third-element {
            width: 30%;
            // background-color: lightyellow;
            text-align: right;
          }

        }
      }

      .introduction-text {
        font-size: 1em;
        letter-spacing: 0.46px;
        font-family: $paragraphs;

        span {
          text-decoration-line: underline;
          text-decoration-style: solid;
          text-decoration-color: #009777;
          text-decoration-thickness: 2px;
        }
      }
    }
  }
}
</style>
