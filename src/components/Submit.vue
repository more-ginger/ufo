<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="introduction">
        <h1>We still believe</h1>
        <div class="initial-paragraph">
          <p class="introduction-text">
            We still believe is a fun project,
          </p>
        </div>
        <div class="data">
          <h1>Original data</h1>
          <p class="introduction-text">
            The original data have been scraped from the rich repository of reports on the NUFORC website.
            You can find the ipynb notebooks here. This one deals with the scraping part, this other one
            with the cleaning one. If you are interested they also have detailed reports about crazy
            sightnings. I'd like to credit <span><a href="https://github.com/planetsig/ufo-reports">planetsig</a></span>
            on GitHub for inspiring me with his collection and
            <span><a href="https://github.com/Akshat-Pant/Web-scraper-nuforc.org">Akshat Pant</a></span>
            for providing a simple example of how to scrape the NUFORC website.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Submit'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/assets/style/global.scss';

.outer-container {
  .inner-container {
    .introduction {
      width: 70%;
      min-height: 90vh;
      margin: 0 auto;
      padding-top: 5%;

      .introduction-text {
        font-size: 1.2em;
        letter-spacing: 0.46px;
        font-family: $paragraphs;
        // column-count: 2;
        // column-gap: 40px;

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
