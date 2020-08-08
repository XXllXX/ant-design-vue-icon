<template>
  <div id="app">
    <icons />
  </div>
</template>

<script>
import icons from './views/icons.vue'

export default {
  name: 'App',
  components: {
    icons,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
}
</style>
