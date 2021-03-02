<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="introduction">
        <img src="../assets/img/shapes/flare.png"/>
        <div class="initial-paragraph">
          <p class="introduction-text">
            We aren’t serious UFO believers ourselves; this project was just a
            fun exploration of a bizarre corner of the internet.
            Our data was scraped from
            <span>
              <a href="http://www.nuforc.org/">
                NUFORC's website
              </a>
              <img src="../assets/img/pointer.svg"/>
            </span>, where you can find ipynb
            notebooks in the project's repo. If you’re interested in seeing more,
            check out the NUFORC archivists’ detailed reports of special sightings
            <span>
                <a href="http://www.nuforc.org/CBBest.html">
                  here
                </a>
              <img src="../assets/img/pointer.svg"/>
            </span>.
            <br/><br/>
            For a deep dive into the cultural history of UFO’s, spanning from 17th
            century literature to Radiohead lyrics, we’ve curated a list below.
            Extra-terrestrial life has long been a part of the popular imagination,
            a kind of mysterious ‘other’ we often project our desires onto, especially
            in moments of heightened isolation. The sexy, mysterious lover, the enemy from afar,
            the new friend - they can we anything we imagine them to be.

            Reach out to us on twitter
            <span>
              <a href="https://mobile.twitter.com/framoriniii">
                @framoriniii
              </a>
              <img src="../assets/img/pointer.svg"/>
            </span> /
            <span>
              <a href="https://mobile.twitter.com/zoecooper91">
                @zoecooper91
              </a>
              <img src="../assets/img/pointer.svg"/>
            </span>.
          </p>
          <div class="list-wrapper">
            <p class="title">Read</p>
            <div v-for="(read,r) in list.Read" :key="r" class="list-inner">
              <p class="first-element">{{read.Year}}</p>
              <p class="second-element"><a :href="read.Link">{{read.Title}}</a>
                <img src="../assets/img/pointer.svg"/>
              </p>
              <p class="third-element">{{read.Artist}}</p>
            </div>
          </div>
          <div class="list-wrapper">
            <p class="title">Listen</p>
            <div v-for="(listen,l) in list.Listen" :key="l" class="list-inner">
              <p class="first-element">{{listen.Year}}</p>
              <p class="second-element"><a :href="listen.Link">{{listen.Title}}</a>
                <img src="../assets/img/pointer.svg"/>
              </p>
              <p class="third-element">{{listen.Artist}}</p>
            </div>
          </div>
          <div class="list-wrapper">
            <p class="title">Watch</p>
            <div v-for="(watch,w) in list.Watch" :key="w" class="list-inner">
              <p class="first-element">{{watch.Year}}</p>
              <p class="second-element"><a :href="watch.Link">{{watch.Title}}</a>
                <img src="../assets/img/pointer.svg"/>
              </p>
              <p class="third-element">{{watch.Artist}}</p>
            </div>
          </div>
        </div>
        <div class="data">
          <img src="../assets/img/shapes/diamond.png"/>
          <h1>Credits</h1>
          <p class="introduction-text">
            <ul>
              <li>
                <span>
                  <a href="https://morini.design/">
                    Francesca Morini
                  </a>
                  <img src="../assets/img/pointer.svg"/>
                </span> / concept design, graphic and visualization design + code</li>
              <li>
                <span>
                  <a href="http://www.zoe-cooper.com/">
                    Zoe Cooper
                  </a>
                  <img src="../assets/img/pointer.svg"/>
                </span> / user experience + content design, research, copy
              </li>
            </ul>
              Thanks to
              <span>
                <a href="https://github.com/planetsig/ufo-reports">
                  planetsig
                </a> <img src="../assets/img/pointer.svg"/>
              </span>
              on GitHub for inspiring us with his work and
              <span>
                <a href="https://github.com/Akshat-Pant/Web-scraper-nuforc.org">
                  Akshat Pant
                </a>
                <img src="../assets/img/pointer.svg"/>
              </span>
              for providing a simple example of how to scrape the NUFORC website.
              And thank you to Giacomo, Francesca, Benedetta and Tobias for their
              feedback and comments.
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

.outer-container {
  .inner-container {
    .introduction {
      width: 55%;
      min-height: 90vh;
      margin: 0 auto;
      padding-bottom: 100px;
      padding-top: 5%;

      img {
        width: 50px;
      }
      .list-wrapper {
        margin: 5% auto;
        padding: 2% 0%;

        .title {
          text-transform: uppercase;
          font-family: $titles;
        }

        .list-inner {
          width: 100%;
          margin: 5px 0px;
          display: inline-flex;
          border-bottom: 1px solid #009777;
          vertical-align: middle;

          p {
            img {
              width:0.7em;
              margin-left: 10px;
            }
          }

          .first-element {
            width: 10%;
            vertical-align: middle;
          }

          .second-element {
            width: 60%;
          }

          .third-element {
            width: 30%;
            text-align: right;
          }

        }

        .list-inner:hover {
          color: pink;
          border-bottom: 1px solid pink;

          .second-element {
            font-family: $titles;
          }
        }
      }

      .introduction-text {
        font-size: 1em;
        letter-spacing: 0.46px;
        font-family: $paragraphs;

        ul {
          padding-left: 0;

          li {
            list-style: none;
            margin-bottom: 2px;
          }
        }

        span {
          text-decoration-line: none;
          color: #7400ff;

          img {
            width:0.7em;
          }
        }

        span:hover {
          color: pink;

          img {
            filter: hue-rotate(15deg);
          }
        }
      }
    }
  }
}
</style>
