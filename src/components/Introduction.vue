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
            I work at the national broadcasting company of my country as the editor
            for data journalism. I have worked here for 25 years. I started doing
            data journalism very early at the end of the 90ies, 1996. I started
            to use computational methods for my work as an investigative reporter.
            I have also worked in Washington around 2005, where I worked with
            huge datasets writing about lobbyism and campaign finance, then in 2015
            I worked at the Guardian. I use all kinds of data tools to make long
            investigative projects, I don't usually do daily journalism. I work a
            lot in excel: collecting, cleaning and finding stories in data. I
            rarely do visualizations, if I do a visualization it is only to find
            a story. I can use GIS softwares, but we have a separate department
            for graphics.
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
  name: 'HelloWorld',
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
        font-size: 24px;
        letter-spacing: 0.46px;
        font-family: $paragraphs;
        column-count: 2;
        column-gap: 40px;
      }
    }
  }
}
</style>
