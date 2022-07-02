<template>
  <dialog open class="dialog" ref="dialog">
    <form method="dialog" class="form">
      <p class="text">Some rules here</p>

      <button class="button" @click="$emit('close')">Ok, got it</button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.dialog {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
}

.form {
  padding: 20px;
  background: white;
}

.text {
  margin: 0 0 20px 0;
}
</style>