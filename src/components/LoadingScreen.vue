<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="loader">
        <img src="@/assets/img/report-icon.gif"/>
        <p v-if="size < 768">please deafult to a bigger viewport</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
  props: {
    size: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

 .outer-container {
   width: 100%;
   height: 100vh;
   background-color: inherit;

   .inner-container {
     width: 50%;
     height: 100%;
     margin: 0 auto;

     .loader {
       margin: 0;
       padding-top: 35vh;
       text-align: center;

       img {
         width: 30%;
       }
     }
   }
 }
</style>
