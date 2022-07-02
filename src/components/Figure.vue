<template>
  <div class="shape">
    <!-- TODO: dynamic component -->
    <Triangle v-if="shape === 'triangle'" :color="color" />
    <Circle v-if="shape === 'circle'" :color="color" />
    <Rectangle v-if="shape === 'rectangle'" :color="color" />

    <span class="weight">{{ weight }} kg</span>
  </div>
</template>

<script lang="ts" setup>
import Triangle from './_generic/Triangle.vue';
import Rectangle from './_generic/Rectangle.vue';
import Circle from './_generic/Circle.vue';

import { shapes } from '../types';

const props = defineProps<{
  shape: typeof shapes[number],
  weight: number
  color?: string,
}>()
</script>

<style scoped>
.shape {
  position: relative;
}

.weight {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
</style>