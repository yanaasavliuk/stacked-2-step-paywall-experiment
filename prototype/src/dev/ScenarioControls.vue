<template>
  <section class="controls">
    <h2 class="cc-heading-small">Prototype Controls</h2>
    <div class="grid">
      <label class="field">
        <span class="cc-text-small">Experiment</span>
        <select :value="experimentId" @change="onExperimentChange">
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
      </label>

      <label class="field toggle">
        <span class="cc-text-small">Viewport source</span>
        <button type="button" class="pill" @click="$emit('toggle-live')">
          {{ useLiveViewport ? 'Live browser viewport' : 'Custom device viewport' }}
        </button>
      </label>

      <label class="field">
        <span class="cc-text-small">Width</span>
        <input
          type="number"
          :value="width"
          :disabled="useLiveViewport"
          min="280"
          max="1600"
          @input="onWidthChange"
        >
      </label>

      <label class="field">
        <span class="cc-text-small">Height</span>
        <input
          type="number"
          :value="height"
          :disabled="useLiveViewport"
          min="480"
          max="1600"
          @input="onHeightChange"
        >
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ExperimentId } from '../experiments'

interface Props {
  experimentId: ExperimentId
  useLiveViewport: boolean
  width: number
  height: number
}

defineProps<Props>()

const emit = defineEmits<{
  (event: 'update:experimentId', value: ExperimentId): void
  (event: 'update:width', value: number): void
  (event: 'update:height', value: number): void
  (event: 'toggle-live'): void
}>()

const onExperimentChange = (event: Event) => {
  const next = (event.target as HTMLSelectElement).value as ExperimentId
  emit('update:experimentId', next)
}

const onWidthChange = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value)
  if (!Number.isNaN(value)) {
    emit('update:width', value)
  }
}

const onHeightChange = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value)
  if (!Number.isNaN(value)) {
    emit('update:height', value)
  }
}
</script>

<style scoped>
.controls {
  display: grid;
  gap: var(--space-12);
  padding: var(--space-16);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-medium);
  background: var(--color-bg-secondary);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-12);
}

.field {
  display: grid;
  gap: var(--space-6);
}

.field input,
.field select {
  height: 3.6rem;
  border-radius: var(--radius-small);
  border: 1px solid var(--color-border-default);
  background: var(--color-bg-primary);
  color: var(--color-text-default);
  padding: 0 var(--space-10);
}

.pill {
  height: 3.6rem;
  border: 1px solid var(--color-border-accent);
  border-radius: 999px;
  background: var(--color-bg-primary);
  color: var(--color-text-default);
  padding: 0 var(--space-12);
  text-align: left;
}

@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
