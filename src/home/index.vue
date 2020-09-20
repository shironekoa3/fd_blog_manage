<template>
  <div>
    <my-aside class="my-aside"></my-aside>
    <div class="container">
      <my-header class="my-header"></my-header>
      <my-main class="my-main"></my-main>
    </div>
  </div>
</template>

<script>
  import myHeader from "./components/header";
  import myAside from "./components/aside";
  import myMain from "./components/main";

  export default {
    components: {
      'my-header': myHeader,
      'my-aside': myAside,
      'my-main': myMain
    }
  }
</script>

<style scoped>
  .my-aside {
    width: 210px;
    height: 100%;
    position: fixed;
    background-color: #001529;
  }
  .container {
    width: 100%;
    padding-left: 210px;
    overflow: hidden;
  }
</style>
