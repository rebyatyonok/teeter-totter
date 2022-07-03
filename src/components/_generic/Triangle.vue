<template>
  <div class="triangle"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  color?: string
  width: number
}>()

const _color = computed(() => props.color || 'red')
const width = computed(() => `${props.width}px`)
const height = computed(() => `${props.width / 2}px`)
</script>

<style scoped>
.triangle {
  width: 0;
  height: 0;
  border-left: v-bind(height) solid transparent;
  border-right: v-bind(height) solid transparent;
  border-bottom: v-bind(width) solid v-bind(_color);
}
</style>