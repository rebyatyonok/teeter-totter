<template>
  <div class="rectangle"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { rand } from '../../helpers/rand';

const props = defineProps<{
  color?: string
}>()

const _color = computed(() => props.color || 'red')
const width = computed(() => `${rand(50, 100)}px`)
const height = computed(() => `${rand(50, 100)}px`)
</script>

<style scoped>
.rectangle {
  width: v-bind(width);
  height: v-bind(height);
  background: v-bind(_color);
}
</style>