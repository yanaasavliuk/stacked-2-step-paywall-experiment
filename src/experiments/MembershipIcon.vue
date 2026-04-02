<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Rive, StateMachineInput } from '@rive-app/canvas'

const props = withDefaults(
  defineProps<{
    tier: 'gold' | 'platinum' | 'diamond'
    size?: number
  }>(),
  {
    size: 40,
  }
)

const canvas = ref<HTMLCanvasElement | null>(null)
let riveInstance: Rive | null = null
let membershipInput: StateMachineInput | null = null

function setTier(tier: string) {
  if (!membershipInput) return
  // Map tier names to Rive enum values
  const tierMap: Record<string, number> = {
    gold: 0,
    platinum: 1,
    diamond: 2,
  }
  membershipInput.value = tierMap[tier] ?? 2
}

onMounted(() => {
  if (!canvas.value) return

  riveInstance = new Rive({
    src: '/membership_icons.riv',
    canvas: canvas.value,
    autoplay: true,
    stateMachines: 'State Machine 1',
    onLoad: () => {
      // Try to find the membership-type input
      if (riveInstance) {
        const inputs = riveInstance.stateMachineInputs('State Machine 1')
        if (inputs) {
          membershipInput = inputs.find(
            (i) => i.name === 'membership-type'
          ) || null
          setTier(props.tier)
        }
        riveInstance.resizeDrawingSurfaceToCanvas()
      }
    },
  })
})

watch(
  () => props.tier,
  (newTier) => {
    setTier(newTier)
  }
)

onUnmounted(() => {
  if (riveInstance) {
    riveInstance.cleanup()
    riveInstance = null
  }
})
</script>

<template>
  <canvas
    ref="canvas"
    :width="size * 2"
    :height="size * 2"
    :style="{ width: size + 'px', height: size + 'px' }"
  />
</template>
