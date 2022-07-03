<template>
  <div class="wrapper">
    <div v-if="game.paused || game.over" class="pause-overlay">
      <p class="pause-overlay-hint">{{ game.paused ? 'Paused' : 'Game over!'}}</p>

      <button @click="game.paused ? game.continue() : restart()">
        {{ game.paused ? 'Continue' : 'Start again' }}
      </button>
    </div>

    <div class="playground">
      <div class="weight-info">
        <div>{{ game.totalWeightBySides.left }}kg</div>
        <div>{{ game.totalWeightBySides.right }}kg</div>
      </div>

      <div class="game">
        <FigureComponent
          v-for="figure in game.figures"
          :key="figure.id"
          :ref="figure.isSettled ? 'whatever' : 'activeFigureRef'"
          :figure="figure"
          :style="getFigureStyleString(figure)"
        />

        <TeeterTotter>
          <div ref="platformRef"></div>
        </TeeterTotter>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useKeydownEvent } from '../composables/useKeydownEvent';
import { useGameStore } from '../store/game';
import { useConfigStore } from '../store/config'
import { isIntersectsPlatform } from "../helpers/isIntersectsPlatform"

import TeeterTotter from './TeeterTotter.vue';
import FigureComponent from './Figure.vue';

import { Figure } from "../classes/figure"
import { KEY_PAUSE } from '../constants';

const game = useGameStore()

const activeFigureRef = ref<InstanceType<typeof FigureComponent>[]>([])
const platformRef = ref<HTMLElement>()

function restart() {
  const config = useConfigStore()

  config.$reset()
  game.$reset()
  game.start()
}

// we can use it to start the game
restart()

const getFigureStyleString = (figure: Figure) => {
  return figure.isSettled
    ? `position: absolute; bottom: 100%; left: ${figure.x}px`
    : `position: absolute; left: ${figure.x}px; top: ${figure.y}px; z-index: 5`
}

useKeydownEvent((e: KeyboardEvent) => {
  if (e.code === KEY_PAUSE) {
    game.paused ? game.continue() : game.pause()
  }
})

onMounted(() => {
  game.$onAction((action) => {
    if (action.name !== 'moveFigureByY') return

    if (isIntersectsPlatform(activeFigureRef.value[0].$el, platformRef.value || null, game.totalBendAngle)) {
      game.settleActiveFigure()
      platformRef.value?.appendChild(activeFigureRef.value[0].$el)
    }
  })

  game.$subscribe(() => {
    if (game.isOver) game.stop()
  })
})
</script>

<style scoped>
.wrapper {
  padding: 20px;
  border: 1px solid gray;
}

.playground {
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
  z-index: 10;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pause-overlay-hint {
  font-weight: bold;
  font-size: 20px;
  color: white;
}
</style>