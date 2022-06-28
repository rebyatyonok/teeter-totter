<template>
  <GameVue
    :is-paused="isPaused"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GameVue from './components/Game.vue';

const isPaused = ref(false)
</script>

<style>
@import "./style/global.css";

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
