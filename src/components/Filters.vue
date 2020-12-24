<template>
  <div class="filter-menu">
    <div>
      <p class="label-title">All sightnings:</p>
    </div>
    <div class="filters">
      <p class="filter">countries &#10132;</p>
      <p class="filter">years &#10132;</p>
      <p class="filter">duration &#10132;</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Filters'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/style/global.scss';

.filter-menu {
  width: 100%;
  border-bottom: 1px solid #009777;
  background-color: #1B0041;
  margin-bottom: 2%;
  display: inline-flex;
  position: sticky;
  top: 0;
  z-index: 1;

  .filters {
    margin: 0 10px;
    display: inline-flex;

    .filter {
      margin: auto 10px;
    }
  }
}

</style>
