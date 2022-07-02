<template>
  <div class="teeter-totter">
    <div class="beam"></div>

    <TriangleVue />
  </div>
</template>

<script lang="ts" setup>
import TriangleVue from './_generic/Triangle.vue';
import { useConfigStore } from '../store/config';
import { computed } from 'vue';

const config = useConfigStore()
const props = defineProps<{
  bendSide: 'left' | 'right',
  bendDegree: number,
}>()


const width = computed(() => `${config.beamWidth * 80}px`)
const rotation = computed(() => {
  const degree = Math.floor(props.bendDegree || 0 / 3);
  return `${props.bendSide === 'right' ? '' : '-'}${degree}deg`
})
</script>

<style scoped>
.teeter-totter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.beam {
  height: 10px;
  width: v-bind(width);
  background: brown;
  transform: rotate(v-bind(rotation));
}
</style>