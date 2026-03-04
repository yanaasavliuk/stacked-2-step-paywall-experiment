<template>
  <div class="app">
    <header class="header">
      <h1 class="cc-heading-large-bold">Condensed Paywall Prototype</h1>
      <p class="cc-text-medium subtitle">
        Adaptive scaffold for Experiment {{ experimentId }} · {{ activeAdaptiveContext.deviceClass }}
      </p>
    </header>

    <ScenarioControls
      :experiment-id="experimentId"
      :use-live-viewport="useLiveViewport"
      :width="activeWidth"
      :height="activeHeight"
      @update:experiment-id="experimentId = $event"
      @update:width="customWidth = $event"
      @update:height="customHeight = $event"
      @toggle-live="useLiveViewport = !useLiveViewport"
    />

    <main class="main">
      <PaywallScreen :experiment="activeExperiment" :adaptive-context="activeAdaptiveContext" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScenarioControls from './dev/ScenarioControls.vue'
import { getExperimentById, type ExperimentId } from './experiments'
import { getAdaptiveContext } from './layout/adaptive'
import { useAdaptiveContext } from './layout/useAdaptiveContext'
import PaywallScreen from './paywall/PaywallScreen.vue'

const experimentId = ref<ExperimentId>('A')
const useLiveViewport = ref(false)
const customWidth = ref(390)
const customHeight = ref(844)

const { width, height } = useAdaptiveContext()

const activeWidth = computed(() => (useLiveViewport.value ? width.value : customWidth.value))
const activeHeight = computed(() => (useLiveViewport.value ? height.value : customHeight.value))
const activeAdaptiveContext = computed(() => getAdaptiveContext(activeWidth.value, activeHeight.value))
const activeExperiment = computed(() => getExperimentById(experimentId.value))
</script>

<style>
html {
  box-sizing: border-box;
  font-size: 62.5%;
}

*, *::before, *::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  background-color: var(--color-bg-primary);
  color: var(--color-text-default);
  font-family: var(--font-family-system);
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}
</style>

<style scoped>
.app {
  width: min(92rem, 100%);
  margin: 0 auto;
  padding: var(--space-20);
  display: grid;
  gap: var(--space-16);
}

.header {
  display: grid;
  gap: var(--space-6);
}

.subtitle {
  color: var(--color-text-subtle);
}

.main {
  display: grid;
}
</style>
