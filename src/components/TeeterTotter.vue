<template>
  <div class="teeter-totter">
    <div class="beam">
      <!-- slot for settled figures -->
      <slot></slot>
    </div>

    <TriangleVue :width="100"/>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import TriangleVue from './_generic/Triangle.vue';
import { useConfigStore } from '../store/config';
import { useGameStore } from '../store/game';
import { metersToPixels } from '../helpers/metersToPx'

const config = useConfigStore()
const game = useGameStore()

const width = computed(() => `${config.teeterTotterWidthInPx}px`)
const height = computed(() => `${config.teeterTotterHeightInPx}px`)
const rotation = computed(() => `${game.totalBendAngle}deg`)
</script>

<style scoped>
.teeter-totter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.beam {
  height: v-bind(height);
  width: v-bind(width);
  background: brown;
  transform: rotate(v-bind(rotation));
  transition: all 0.2s;
}
</style>