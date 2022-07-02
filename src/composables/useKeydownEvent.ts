import { onMounted, onUnmounted } from 'vue'

export function useKeydownEvent(callback: (...args: any) => any) {
  onMounted(() => window.addEventListener('keydown', callback))
  onUnmounted(() => window.removeEventListener('keydown', callback))
}