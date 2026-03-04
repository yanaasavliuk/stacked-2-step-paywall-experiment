import { computed, onMounted, onUnmounted, ref } from 'vue'
import { getAdaptiveContext } from './adaptive'

export function useAdaptiveContext() {
  const width = ref(390)
  const height = ref(844)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  const adaptiveContext = computed(() => getAdaptiveContext(width.value, height.value))

  return {
    width,
    height,
    adaptiveContext,
  }
}
