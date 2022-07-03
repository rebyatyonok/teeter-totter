<template>
  <Playground v-if="areRulesRead"/>

  <RulesModal v-else @close="markRulesRead()" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Playground from './components/Playground.vue';
import RulesModal from './components/RulesModal.vue';

const areRulesRead = ref(false)

const markRulesRead = () => {
  areRulesRead.value = true
}
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
