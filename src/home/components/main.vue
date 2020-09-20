<template>
  <transition mode="out-in">
    <router-view/>
  </transition>
</template>

<script>
  export default {}
</script>

<style scoped>
  .v-enter,
  .v-leave-to {
    transform: translateX(50px);
    opacity: 0.5;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all .5s;

  }
</style>
