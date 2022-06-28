<template>
  <div v-if="isPaused">Press SPACE to continue</div>
  <div v-else>Here the game will be</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isPaused: boolean
}>()
</script>