<template>
  <section class="paywall" :data-device="adaptiveContext.deviceClass" :data-size="adaptiveContext.sizeClass">
    <header class="hero">
      <span class="badge cc-text-small">{{ experiment.badge }}</span>
      <h1 class="cc-heading-large-bold">{{ experiment.headline }}</h1>
      <p class="cc-paragraph-medium">{{ experiment.subhead }}</p>
    </header>

    <div class="content">
      <section class="plans">
        <article
          v-for="plan in experiment.plans"
          :key="plan.id"
          class="plan"
          :class="{ highlighted: plan.highlighted }"
        >
          <p class="cc-text-small">{{ plan.label }}</p>
          <p class="price cc-heading-medium">
            {{ plan.price }}<span class="cadence cc-text-small">{{ plan.cadence }}</span>
          </p>
        </article>
      </section>

      <section class="features">
        <article v-for="feature in experiment.features" :key="feature.title" class="feature">
          <h2 class="cc-heading-small">{{ feature.title }}</h2>
          <p class="cc-text-medium">{{ feature.detail }}</p>
        </article>
      </section>
    </div>

    <footer class="footer">
      <CcButton variant="primary" size="large">{{ experiment.cta }}</CcButton>
      <p class="cc-text-small context">
        {{ adaptiveContext.deviceClass }} · {{ adaptiveContext.orientation }} · {{ adaptiveContext.sizeClass }}
      </p>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { CcButton } from '@chesscom/design-system'
import type { ExperimentConfig } from '../experiments'
import type { AdaptiveContext } from '../layout/adaptive'

interface Props {
  experiment: ExperimentConfig
  adaptiveContext: AdaptiveContext
}

defineProps<Props>()
</script>

<style scoped>
.paywall {
  width: 100%;
  display: grid;
  gap: var(--space-18);
  padding: var(--space-18);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-medium);
  background: var(--color-bg-secondary);
}

.hero {
  display: grid;
  gap: var(--space-8);
}

.badge {
  width: fit-content;
  padding: var(--space-4) var(--space-10);
  border-radius: 999px;
  border: 1px solid var(--color-border-default);
}

.content {
  display: grid;
  gap: var(--space-16);
}

.plans {
  display: grid;
  gap: var(--space-10);
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.plan {
  display: grid;
  gap: var(--space-6);
  padding: var(--space-12);
  border-radius: var(--radius-small);
  border: 1px solid var(--color-border-default);
}

.plan.highlighted {
  border-color: var(--color-border-accent);
  background: var(--color-bg-accent-subtle);
}

.price {
  display: flex;
  align-items: baseline;
  gap: var(--space-6);
}

.cadence {
  color: var(--color-text-subtle);
}

.features {
  display: grid;
  gap: var(--space-10);
}

.feature {
  display: grid;
  gap: var(--space-4);
}

.footer {
  display: grid;
  gap: var(--space-8);
}

.context {
  color: var(--color-text-subtle);
}

.paywall[data-size='small'] .plans {
  grid-template-columns: 1fr;
}

.paywall[data-device='tablet'][data-size='large'] .content {
  grid-template-columns: 0.9fr 1.1fr;
}
</style>
