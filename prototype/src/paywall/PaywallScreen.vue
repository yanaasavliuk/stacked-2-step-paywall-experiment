<template>
  <section class="paywall" :data-device="adaptiveContext.deviceClass" :data-size="adaptiveContext.sizeClass">
    <div class="surface">
      <header class="hero">
        <h1 class="cc-heading-large-bold hero-title">{{ experiment.subhead }}</h1>
        <CcSegmentedControl
          :labels="['Yearly', 'Monthly']"
          :selected="billingIndex"
          size="small"
          @segment-clicked="billingIndex = $event"
        />
        <div class="hero-art-wrap">
          <img src="/assets/pawn-hero.png" alt="" class="hero-art">
        </div>
      </header>

      <section class="table">
        <div class="table-head">
          <div class="feature-col unlimited">UNLIMITED</div>
          <div
            v-for="plan in experiment.plans"
            :key="plan.id"
            class="plan-head"
            :class="{ highlighted: plan.highlighted }"
          >
            <div class="plan-icon">{{ plan.icon }}</div>
            <div class="cc-text-small plan-label">{{ plan.label }}</div>
          </div>
        </div>

        <div
          v-for="feature in experiment.features"
          :key="feature.title"
          class="table-row"
        >
          <div class="feature-col cc-text-medium">{{ feature.title }}</div>
          <div
            v-for="plan in experiment.plans"
            :key="`${feature.title}-${plan.id}`"
            class="plan-cell"
            :class="{ highlighted: plan.highlighted }"
          >
            <CcIcon
              v-if="feature.availability[plan.id]"
              glyph="circle-fill-check"
              class="icon-check"
            />
            <span v-else class="dash">-</span>
          </div>
        </div>
      </section>
    </div>

    <footer class="cta-wrap">
      <p class="cc-text-small legal">{{ experiment.legalLine }}</p>
      <p class="cc-heading-medium cta-price">{{ experiment.primaryPrice }}</p>
      <p class="cc-text-small legal-sub">{{ experiment.primaryPriceDetail }}</p>
      <CcButton class="cta" variant="monetization" size="xx-large" fullWidth>
        {{ experiment.cta }}
      </CcButton>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CcButton, CcIcon, CcSegmentedControl } from '@chesscom/design-system'
import type { ExperimentConfig } from '../experiments'
import type { AdaptiveContext } from '../layout/adaptive'

interface Props {
  experiment: ExperimentConfig
  adaptiveContext: AdaptiveContext
}

defineProps<Props>()

const billingIndex = ref(0)
</script>

<style scoped>
.paywall {
  width: min(100%, 82rem);
  min-height: min(84.4rem, 100vh);
  margin-inline: auto;
  display: grid;
  grid-template-rows: 1fr auto;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background:
    radial-gradient(120% 70% at 50% -20%, rgba(255, 255, 255, 0.09), transparent 60%),
    linear-gradient(180deg, var(--color-bg-primary) 0%, color-mix(in srgb, var(--color-bg-primary) 85%, black) 100%);
}

.surface {
  display: grid;
  gap: var(--space-16);
  padding: clamp(var(--space-16), 3vw, var(--space-24));
}

.hero {
  display: grid;
  justify-items: center;
  gap: var(--space-16);
  padding-top: clamp(var(--space-16), 6vh, 5.2rem);
}

.hero-title {
  color: var(--color-text-inverse);
  text-align: center;
  max-width: 34rem;
}

.hero-art-wrap {
  width: 100%;
  display: grid;
  place-items: center;
  min-height: 16rem;
}

.hero-art {
  width: clamp(13rem, 36vw, 16rem);
  height: auto;
  object-fit: contain;
}

.table {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-text-inverse) 12%, transparent);
  background: color-mix(in srgb, var(--color-bg-primary) 84%, black);
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: minmax(10.8rem, 1.6fr) repeat(3, minmax(6.4rem, 1fr));
}

.table-head {
  min-height: 4rem;
}

.table-row {
  min-height: 4.1rem;
  border-top: 1px solid color-mix(in srgb, var(--color-text-inverse) 10%, transparent);
}

.feature-col,
.plan-cell,
.plan-head {
  display: grid;
  place-items: center;
  border-left: 1px solid color-mix(in srgb, var(--color-text-inverse) 8%, transparent);
}

.feature-col {
  border-left: none;
  justify-items: start;
  padding-inline: var(--space-12);
  color: var(--color-text-inverse);
}

.feature-col.unlimited {
  justify-items: center;
  color: var(--color-text-subtle);
  background: color-mix(in srgb, var(--color-text-inverse) 12%, transparent);
  font-size: 1.1rem;
  letter-spacing: 0.04em;
  font-weight: 700;
}

.plan-head {
  gap: var(--space-2);
  padding-top: var(--space-8);
  color: var(--color-text-inverse);
}

.plan-head.highlighted,
.plan-cell.highlighted {
  background: color-mix(in srgb, var(--color-bg-primary) 55%, black);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--color-bg-win) 85%, transparent);
}

.plan-icon {
  font-size: 2.2rem;
  line-height: 1;
}

.plan-label {
  color: var(--color-text-inverse);
}

.icon-check {
  color: var(--color-text-link);
}

.dash {
  color: var(--color-text-subtle);
  font-weight: 700;
}

.cta-wrap {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-12) clamp(var(--space-12), 3vw, var(--space-20)) var(--space-16);
  background: color-mix(in srgb, var(--color-bg-primary) 80%, black);
  border-top: 1px solid color-mix(in srgb, var(--color-text-inverse) 10%, transparent);
}

.legal,
.legal-sub {
  text-align: center;
  color: var(--color-text-subtle);
}

.cta-price {
  text-align: center;
  color: var(--color-text-inverse);
}

.cta {
  margin-top: var(--space-8);
}

.paywall[data-size='small'] {
  border-radius: 0;
}

.paywall[data-size='small'] .feature-col {
  font-size: 1.4rem;
}

@media (max-width: 420px) {
  .table-head,
  .table-row {
    grid-template-columns: minmax(10rem, 1.4fr) repeat(3, minmax(5.8rem, 1fr));
  }
}
</style>
