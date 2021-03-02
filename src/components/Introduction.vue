<template>
  <div class="introduction">
    <div class="innerbody">
      <div class="main-body">
        <img class="introduction-img" src="../assets/img/ufos.gif"/>
        <div class="initial-paragraph">
          <p class="introduction-text">
            While all eyes were on the still-raging pandemic, the Pentagon quietly
            released their records of reported UFO sightings around the world
            (yes, really). The newly declassified information came on the heels
            of years of witness testimonies collected by the <span><a href="www.nuforc.org/">
            National UFO Reporting Center in Washington DC
            <img src="../assets/img/pointer.svg"/></a></span> for several decades.
            So, in need of a little comic relief from the monotony of lockdown life,
            we decided to comb through the new material and see what the data might
            reveal! Some entries were incredibly detailed, including close descriptions
            of each UFO’s design, brightness, and speed. Some seemed more offhand, or vague.
            All of them were weird.
          <br/><br/>
            We had so many questions. Where do these testimonies send to come from?
            When are they most often reported? For a broader view, we designed a
            <span><router-link to="/chronology">
              density heat map <img src="../assets/img/pointer.svg"/>
            </router-link></span>, complete with glowing hotspots of supposed
            extra-terrestrial activity, then a <span><router-link to="/chronology">
              timeline dating back to 2017 <img src="../assets/img/pointer.svg"/>
            </router-link></span>.
            <br/><br/>
            One trend immediately stood out to us: reports tend to come in during
            holiday times, when many people feel lonely. The first lockdown in 2020
            saw a sharp increase in witness testimonies and we experienced an
            unprecedented sense of alienation. And what began as a fun and silly
            project - we aren’t serious UFO believers ourselves - became a poignant
            reflection on the chaotic time we’re living through, when we want to
            believe we’re not alone.
          </p>
        </div>
      </div>
      <Sightings />
    </div>
  </div>
</template>

<script>
import Sightings from '@/components/Sightings.vue'

export default {
  name: 'Introduction',
  components: {
    Sightings
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/style/global.scss';

.introduction {
  width: 100%;

  .main-body {
    height: 50%;
    .introduction-img {
      width: 800px;
      position: absolute;
      top: 100px;
      z-index: 2;
      left: 38%;
      opacity: 0.2;
      pointer-events: none;
    }

    margin: 0 auto;
    padding-top: 80px;
    padding-bottom: 1.5%;

    .title {
      font-family: $titles;
    }

    .initial-paragraph {
      .introduction-text {
        margin: 0 10%;
        margin-bottom: 50px;
        width: 40%;
        font-size: 1em;
        letter-spacing: 0.45px;
        font-family: $paragraphs;

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

@media only screen and (max-width: 1000px) {

  .introduction {

    .main-body {
      height: 100vh;
      width: 100%;
      .initial-paragraph {
        .introduction-text {
          width: 80%;
        }
      }
      .introduction-img {
        width: 50% !important;
        left: calc(98% - 50%) !important;
      }
    }
  }
}

</style>
