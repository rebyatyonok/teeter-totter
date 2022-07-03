<template>
  <div class="rectangle"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { rand } from '../../helpers/rand';

const props = defineProps<{
  color?: string
  size: number
}>()

const _color = computed(() => props.color || 'red')
const width = computed(() => `${props.size}px`)
const height = computed(() => `${props.size}px`)
</script>

<style scoped>
.rectangle {
  width: v-bind(width);
  height: v-bind(height);
  background: v-bind(_color);
}
</style>