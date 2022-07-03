<template>
  <div class="shape">
    <!-- TODO: dynamic component -->
    <Triangle v-if="figure.shape === 'triangle'" :color="figure.color" :width="figure.width"/>
    <Circle v-if="figure.shape === 'circle'" :color="figure.color" :size="figure.width" />
    <Rectangle v-if="figure.shape === 'rectangle'" :color="figure.color" :size="figure.width" />

    <span class="weight">{{ figure.weight }} kg</span>
  </div>
</template>

<script lang="ts" setup>
import Triangle from './_generic/Triangle.vue';
import Rectangle from './_generic/Rectangle.vue';
import Circle from './_generic/Circle.vue';

import { Figure } from '../classes/figure';

const props = defineProps<{
  figure: Figure
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