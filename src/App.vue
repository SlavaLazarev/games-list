<template>
  <div id="app">
   <Navbar/>
   <GamesList/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import GamesList from "./components/GamesList";

export default {
  name: 'App',
  components: {
    GamesList,
    Navbar,
  }
}
</script>

<style scoped>
#app {
  max-width: 800px;
  margin: 0 auto;
}
</style>
