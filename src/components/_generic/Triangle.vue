<template>
  <div class="triangle"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { rand } from '../../helpers/rand';

const props = defineProps<{
  color?: string
}>()
const size = rand(50, 100)
const _color = computed(() => props.color || 'red')
const width = computed(() => `${size}px`)
const height = computed(() => `${size / 2}px`)
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