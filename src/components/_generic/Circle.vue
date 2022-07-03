<template>
  <div class="circle"></div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { rand } from '../../helpers/rand';

const props = defineProps<{
  color?: string
  size: number
}>()

const _color = computed(() => props.color || 'red')
const size = computed(() => `${props.size}px`)
</script>

<style scoped>
.circle {
  width: v-bind(size);
  height: v-bind(size);
  border-radius: 100000px;
  background: v-bind(_color);
}
</style>