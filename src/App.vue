<template>
  <pokemon-game />
</template>

<script>
import PokemonGame from './pages/PokemonPage.vue'

export default {
  name: 'App',
  components: {
    PokemonGame
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

