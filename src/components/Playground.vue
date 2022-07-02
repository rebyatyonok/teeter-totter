<template>
  <div class="game-wrapper">
    <div v-if="game.$state.paused" class="pause-overlay">
      <p class="pause-overlay-hint">Paused</p>
    </div>

    <div class="weight-info">
      <div>{{ game.totalWeight.left }}kg</div>
      <div>{{ game.totalWeight.right }}kg</div>
    </div>

    <div class="game">
      <FigureComponent
        v-for="figure in game.figures"
        :key="figure.id"
        :ref="figure.isSettled ? 'whatever' : 'activeFigure'"
        :shape="figure.shape"
        :color="figure.color"
        :weight="figure.weight"
        :style="getFigureStyleString(figure)"
      />

      <TeeterTotter
        ref="teeterTotter"
        :bend-degree="0"
        :bend-side="'left'"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useKeydownEvent } from '../composables/useKeydownEvent';
import { useGameStore } from '../store/game';
import TeeterTotter from './TeeterTotter.vue';
import FigureComponent from './Figure.vue';
import { isFigureSettled } from "../helpers/isFigureSettled"

import { Figure } from "../types"

const game = useGameStore()
const teeterTotter = ref<InstanceType<typeof TeeterTotter>>()
const activeFigure = ref<InstanceType<typeof FigureComponent>[]>([])

game.start()

const getFigureStyleString = (figure: Figure) => {
  return `position: absolute; left: ${figure.x}%; top: ${figure.y}px; transition: all 0.5s; z-index: 5`
}

useKeydownEvent((e: KeyboardEvent) => {
  if (e.code === 'Space') {
    game.paused ? game.continue() : game.pause()
  }
})

onMounted(() => {
  game.$onAction((action) => {
    if (action.name !== 'moveFigureByY') return

    if (isFigureSettled(activeFigure.value[0].$el, teeterTotter.value?.$el)) {
      game.settleActiveFigure()
    }
  })
})
</script>

<style scoped>
.game-wrapper {
  padding: 20px;
  border: 1px solid gray;
  height: 500px;
  position: relative;
}

.game {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.weight-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.pause-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pause-overlay-hint {
  font-weight: bold;
  font-size: 20px;
  color: white;
}

</style>