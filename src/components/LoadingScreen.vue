<template>
  <div class="outer-container">
    <div class="inner-container">
      <div class="loader">
        <img src="@/assets/img/report-icon.gif"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @keyframes fade {
//   0%, 100% { opacity: 1; }
//       50% { opacity: .25; }
//     }

 .outer-container {
   width: 100%;
   height: 100vh;
   background-color: inherit;

   .inner-container {
     // background-color: blue;
     width: 50%;
     height: 100%;
     margin: 0 auto;

     .loader {
       margin: 0;
       padding-top: 35%;
       text-align: center;
       // animation: fade 2s infinite reverse ease-in-out;
       // animation-duration: 2s;
       // animation-iteration-count: infinite;
       // animation-direction: reverse;
       // animation-timing-function: ease-in-out;

       img {
         width: 30%;
       }
     }
   }
 }
</style>
