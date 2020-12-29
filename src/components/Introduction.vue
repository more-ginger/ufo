<template>
  <div class="introduction">
    <div class="innerbody">
      <div class="upper-menu">
        <Menu />
      </div>
      <div class="main-body">
        <!-- <h2 class="title">Introduction title</h2> -->
        <div class="initial-paragraph">
          <p class="introduction-text">
            An unidentified flying object (UFO) is any aerial phenomenon that
            cannot immediately be identified or explained. From the beginning of
            1900 <span>more than 80.000 UFOs sightings have been reported</span>.
            In August 2020 the Pentagon decided to form a new body to monitor these
            mysterious events <span><a href="https://www.theguardian.com/us-news/2020/aug/15/us-department-defense-ufo-taskforce">(source)</a></span>.
            I decided to visualize them, starting from 2010. Each sightning is represented
            as a glyph, based on the shape of these mysterious flying objects: blinking lights,
            crosses, cylinders, mutable structures are just some of the weird thigs reported. Some
            entries even have comments and testimonies describing the event and the object in detail.
            Some others are crooked and incomplete. Here each one of them can be browsed and geo-located.
            <span>We still believe. We want to believe. We are not alone in this universe.</span>
          </p>
        </div>
        <img class="introduction-img" src="../assets/img/ufos.gif"/>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'

export default {
  name: 'Introduction',
  components: {
    Menu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/style/global.scss';

.introduction {
  width: 100%;
  height: 90vh;

  .main-body {
    .introduction-img {
      width: 40%;
      position: absolute;
      top: 40vh;
      left: calc(98% - 40%);
      mix-blend-mode: color-dodge;
    }

    margin: 0 auto;
    width: 70%;
    padding-top: 100px;

    .title {
      font-family: $titles;
    }

    .initial-paragraph {
      .introduction-text {
        font-size: 1.5em;
        letter-spacing: 0.46px;
        font-family: $paragraphs;
        column-count: 2;
        column-gap: 40px;

        span {
          text-decoration-line: underline;
          text-decoration-style: solid;
          text-decoration-color: #7400ff;
          text-decoration-thickness: 5px;
        }
      }
    }
  }
}
</style>
