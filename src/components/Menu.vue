<template>
  <div class="bar">
    <div class="inner-bar">
      <div class="labels-container">
        <h3 class="title">we still believe</h3>
        <div class="selectors">
          <a href='#'><h3>all the sightings</h3></a>
          <a href='#'><h3>in chronological order</h3></a>
          <a href='#'><img src="../assets/img/report-icon.png"/></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/style/global.scss';

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
        right: 0%;
        font-family: $titles;
        display: inline-flex;
        width: 50%;

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
</style>
