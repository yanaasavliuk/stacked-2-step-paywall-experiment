<script setup lang="ts">
import { ref, computed } from 'vue'
import { getTranslations, type LangCode } from './translations'
import PaywallHeroSvg from '../assets/paywall-hero-figma.svg?url'
import { CcButton, CcIcon } from '@chesscom/design-system'

type TierType = 'gold' | 'platinum' | 'diamond'
type BillingType = 'monthly' | 'yearly'

const props = withDefaults(
  defineProps<{
    lang?: LangCode
    platform?: 'ios' | 'android'
    showImage?: boolean
    deviceId?: string
    orientation?: 'portrait' | 'landscape'
    trialEligible?: boolean
  }>(),
  {
    lang: 'en',
    platform: 'ios',
    showImage: true,
    deviceId: 'iphone-15-pro',
    orientation: 'portrait',
    trialEligible: false,
  }
)

const emit = defineEmits<{
  selectPlan: [{ tier: TierType; billing: BillingType }]
  back: []
}>()

// State
const currentStep = ref<1 | 2>(1)
const selectedTier = ref<TierType>('diamond')
const selectedBilling = ref<BillingType>('yearly')

// Translations
const t = computed(() => getTranslations(props.lang))

// Pricing data
const pricing = {
  diamond: {
    yearly: { monthlyRate: 10.0, annualTotal: 119.99 },
    monthly: { monthlyRate: 16.99 },
  },
  platinum: {
    yearly: { monthlyRate: 6.67, annualTotal: 79.99 },
    monthly: { monthlyRate: 10.99 },
  },
  gold: {
    yearly: { monthlyRate: 4.17, annualTotal: 49.99 },
    monthly: { monthlyRate: 6.99 },
  },
}

// Plan configuration
const plansConfig = computed(() => [
  {
    id: 'diamond' as TierType,
    icon: 'commerce-diamond',
    name: t.value.tiers.diamond,
    description: t.value.planDescriptions.diamond,
  },
  {
    id: 'platinum' as TierType,
    icon: 'commerce-platinum',
    name: t.value.tiers.platinum,
    description: t.value.planDescriptions.platinum,
  },
  {
    id: 'gold' as TierType,
    icon: 'commerce-gold',
    name: t.value.tiers.gold,
    description: t.value.planDescriptions.gold,
  },
])

// Features list in order
const allFeatures = [
  { id: 'puzzles', icon: 'game-puzzle' },
  { id: 'lessons', icon: 'game-lesson' },
  { id: 'bots', icon: 'game-type-computer' },
  { id: 'playCoach', icon: 'game-lesson-student' },
  { id: 'noAds', icon: 'circle-block' },
  { id: 'gameReview', icon: 'move-circle-best' },
  { id: 'moveExplanations', icon: 'check-circle' },
  { id: 'insights', icon: 'device-bulb-glow' },
] as const

// Feature inclusion matrix
const featureMatrix = {
  diamond: {
    puzzles: true,
    lessons: true,
    bots: true,
    playCoach: true,
    noAds: true,
    gameReview: true,
    moveExplanations: true,
    insights: true,
  },
  platinum: {
    puzzles: true,
    lessons: true,
    bots: true,
    playCoach: true,
    noAds: true,
    gameReview: true,
    moveExplanations: false,
    insights: false,
  },
  gold: {
    puzzles: true,
    lessons: true,
    bots: true,
    playCoach: true,
    noAds: true,
    gameReview: false,
    moveExplanations: false,
    insights: false,
  },
}

// Computed properties
const currentHeadline = computed(() => {
  const strings = props.trialEligible ? t.value.trialEligible : t.value.notTrialEligible
  return strings.headline
})

const currentCtaText = computed(() => {
  const strings = props.trialEligible ? t.value.trialEligible : t.value.notTrialEligible
  return strings.cta
})

type FeatureKey = keyof typeof featureMatrix.diamond

const hasFeature = (featureName: string): boolean => {
  return featureMatrix[selectedTier.value][featureName as FeatureKey] ?? false
}

const featureLabel = (featureName: string) => {
  return t.value.features[featureName as keyof typeof t.value.features]
}

// Methods
const goToStep2 = () => {
  currentStep.value = 2
}

const goToStep1 = () => {
  currentStep.value = 1
  emit('back')
}

const selectTier = (tier: TierType) => {
  selectedTier.value = tier
}

const selectBilling = (billing: BillingType) => {
  selectedBilling.value = billing
}

const handleCta = () => {
  emit('selectPlan', { tier: selectedTier.value, billing: selectedBilling.value })
}

const formatPrice = (price: number) => {
  return price.toFixed(2)
}
</script>

<template>
  <div class="paywall" :data-step="currentStep" :data-lang="lang" :data-platform="platform">
    <!-- STEP 1: Plan Selection -->
    <div v-if="currentStep === 1" class="step-content step-1">
      <!-- Hero Title -->
      <h1 class="paywall-title">{{ currentHeadline }}</h1>

      <!-- Hero Image -->
      <div v-if="showImage" class="hero-image-container">
        <img :src="PaywallHeroSvg" alt="" class="hero-image" />
      </div>

      <!-- Plan Cards -->
      <div class="plan-cards-container">
        <div
          v-for="plan in plansConfig"
          :key="plan.id"
          class="plan-card"
          :class="{ 'plan-card--selected': selectedTier === plan.id }"
          @click="selectTier(plan.id)"
          role="button"
          tabindex="0"
          @keydown.enter="selectTier(plan.id)"
          @keydown.space="selectTier(plan.id)"
        >
          <div class="plan-card-icon">
            <CcIcon :name="plan.icon" variant="color" :size="40" />
          </div>
          <div class="plan-card-content">
            <h2 class="plan-card-title">{{ plan.name }}</h2>
            <p class="plan-card-description">{{ plan.description }}</p>
          </div>
        </div>
      </div>

      <!-- Spacer for bottom padding -->
      <div class="step-1-spacer" />
    </div>

    <!-- STEP 2: Billing Details -->
    <div v-else-if="currentStep === 2" class="step-content step-2">
      <!-- Back Button -->
      <button class="step-2-back-button" @click="goToStep1" :aria-label="`Back`">
        <CcIcon name="arrow-left" :size="24" />
      </button>

      <!-- Title -->
      <h1 class="paywall-title">{{ currentHeadline }}</h1>

      <!-- Subtitle -->
      <p class="step-2-subtitle">Select a Plan</p>

      <!-- Billing Toggle Cards -->
      <div class="billing-cards-container">
        <!-- Yearly Card -->
        <div
          class="billing-card"
          :class="{ 'billing-card--selected': selectedBilling === 'yearly' }"
          @click="selectBilling('yearly')"
          role="button"
          tabindex="0"
          @keydown.enter="selectBilling('yearly')"
          @keydown.space="selectBilling('yearly')"
        >
          <div class="billing-card-left">
            <p class="billing-card-label">{{ t.yearly }}</p>
            <p class="billing-card-subtext">
              {{ t.billedAnnually(`$${formatPrice(pricing[selectedTier].yearly.monthlyRate)}`) }}
            </p>
          </div>
          <div class="billing-card-right">
            <p class="billing-card-price-strikethrough">
              ${{ formatPrice(pricing[selectedTier].monthly.monthlyRate) }}/mo
            </p>
            <p class="billing-card-price">
              ${{ formatPrice(pricing[selectedTier].yearly.annualTotal) }}/yr
            </p>
          </div>
        </div>

        <!-- Monthly Card -->
        <div
          class="billing-card"
          :class="{ 'billing-card--selected': selectedBilling === 'monthly' }"
          @click="selectBilling('monthly')"
          role="button"
          tabindex="0"
          @keydown.enter="selectBilling('monthly')"
          @keydown.space="selectBilling('monthly')"
        >
          <div class="billing-card-left">
            <p class="billing-card-label">{{ t.monthly }}</p>
          </div>
          <div class="billing-card-right">
            <p class="billing-card-price">
              ${{ formatPrice(pricing[selectedTier].monthly.monthlyRate) }}/mo
            </p>
          </div>
        </div>
      </div>

      <!-- Features List Heading -->
      <div class="features-heading">
        <CcIcon :name="`commerce-${selectedTier}`" variant="color" ::size="20" />
        <h2 class="features-heading-text">
          Unlimited with <span class="features-heading-tier">{{ t.tiers[selectedTier] }} Plan:</span>
        </h2>
      </div>

      <!-- Features List -->
      <div class="features-list">
        <div
          v-for="feature in allFeatures"
          :key="feature.id"
          class="feature-row"
          :class="{ 'feature-row--disabled': !hasFeature(feature.id) }"
        >
          <div class="feature-icon">
            <CcIcon :name="feature.icon" :size="16" />
          </div>
          <span class="feature-name">{{ featureLabel(feature.id) }}</span>
          <div class="feature-status">
            <CcIcon v-if="hasFeature(feature.id)" name="check-circle-filled" :size="20" />
            <CcIcon v-else name="close-circle" :size="20" />
          </div>
        </div>
      </div>

      <!-- Spacer for bottom padding -->
      <div class="step-2-spacer" />
    </div>

    <!-- Sticky Footer CTA -->
    <div class="cta-footer" :class="{ 'cta-footer--visible': true }">
      <CcButton
        :label="currentCtaText"
        variant="monetization"
        size="x-large"
        fullWidth
        @click="currentStep === 1 ? goToStep2() : handleCta()"
      />
    </div>
  </div>
</template>

<style scoped>
:root {
  /* These are fallbacks; normally provided by design system */
  --space-2: 2px;
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-24: 24px;
  --space-32: 32px;
  --border-3: 3px;
  --color-gray-800: #1a1a1a;
  --color-gray-900: #0a0a0a;
  --color-text-boldest: #ffffff;
  --color-transparent-white-5: rgba(255, 255, 255, 0.05);
  --color-transparent-white-10: rgba(255, 255, 255, 0.1);
  --color-transparent-white-50: rgba(255, 255, 255, 0.5);
  --color-transparent-white-72: rgba(255, 255, 255, 0.72);
  --color-border-selected: #81b64c;
  --color-blue-100: #4a90e2;
  --color-red-100: #e74c3c;
  --font-family-heading: -apple-system, BlinkMacSystemFont, 'Chess Sans', 'Segoe UI', Roboto,
    sans-serif;
  --font-family-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --radius-md: 8px;
}

.paywall {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: var(--color-gray-900);
  color: var(--color-text-boldest);
  font-family: var(--font-family-system);
  overflow-x: hidden;
}

/* Step Container Transitions */
.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-16) var(--space-12) calc(120px + var(--space-16)) var(--space-12);
  animation: slideIn 0.3s ease-out;
}

.step-1 {
  animation-name: slideInRight;
}

.step-2 {
  animation-name: slideInLeft;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Title */
.paywall-title {
  font-family: var(--font-family-heading);
  font-size: 22px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  margin: 0 0 var(--space-24) 0;
  color: var(--color-text-boldest);
}

/* Step 1: Hero Image */
.hero-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: var(--space-24);
}

.hero-image {
  width: 100%;
  max-width: 280px;
  height: auto;
  object-fit: contain;
}

/* Step 1: Plan Cards */
.plan-cards-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  margin-bottom: var(--space-16);
}

.plan-card {
  display: flex;
  gap: var(--space-12);
  padding: var(--space-12);
  border-radius: var(--radius-md);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.plan-card:hover {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
}

.plan-card--selected {
  outline: var(--border-3) solid var(--color-border-selected);
  outline-offset: var(--space-2);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
}

.plan-card-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.plan-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.plan-card-title {
  font-family: var(--font-family-heading);
  font-size: 17px;
  font-weight: 700;
  margin: 0 0 var(--space-4) 0;
  color: var(--color-text-boldest);
}

.plan-card-description {
  font-size: 12px;
  margin: 0;
  color: var(--color-transparent-white-72);
  line-height: 1.4;
}

.step-1-spacer {
  flex: 1;
  min-height: 20px;
}

/* Step 2: Back Button */
.step-2-back-button {
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--color-text-boldest);
  cursor: pointer;
  padding: 0;
  border-radius: var(--radius-md);
  transition: background 0.2s ease;
  margin-bottom: var(--space-16);
}

.step-2-back-button:hover {
  background: var(--color-transparent-white-10);
}

/* Step 2: Subtitle */
.step-2-subtitle {
  font-size: 12px;
  text-align: center;
  color: var(--color-transparent-white-50);
  margin: 0 0 var(--space-16) 0;
}

/* Step 2: Billing Cards */
.billing-cards-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  margin-bottom: var(--space-24);
}

.billing-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-16);
  height: 80px;
  border-radius: var(--radius-md);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.billing-card:hover {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
}

.billing-card--selected {
  outline: var(--border-3) solid var(--color-border-selected);
  outline-offset: var(--space-2);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
}

.billing-card-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.billing-card-right {
  flex: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.billing-card-label {
  font-family: var(--font-family-heading);
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  color: var(--color-text-boldest);
}

.billing-card-subtext {
  font-size: 11px;
  margin: var(--space-2) 0 0 0;
  color: var(--color-transparent-white-50);
}

.billing-card-price {
  font-family: var(--font-family-heading);
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  color: var(--color-text-boldest);
}

.billing-card-price-strikethrough {
  font-size: 12px;
  margin: 0 0 var(--space-4) 0;
  color: var(--color-transparent-white-50);
  text-decoration: line-through;
}

/* Step 2: Features */
.features-heading {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  margin-bottom: var(--space-16);
  padding-top: var(--space-16);
  border-top: 1px solid var(--color-transparent-white-10);
}

.features-heading-text {
  font-family: var(--font-family-heading);
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: var(--color-transparent-white-72);
}

.features-heading-tier {
  color: var(--color-border-selected);
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.feature-row {
  display: flex;
  align-items: center;
  gap: var(--space-12);
  padding: var(--space-12) 0;
  border-bottom: 1px solid var(--color-transparent-white-10);
  transition: opacity 0.2s ease;
}

.feature-row:last-child {
  border-bottom: none;
}

.feature-row--disabled {
  opacity: 0.5;
}

.feature-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--color-transparent-white-72);
}

.feature-name {
  flex: 1;
  font-size: 14px;
  color: var(--color-transparent-white-72);
}

.feature-status {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--color-blue-100);
}

.feature-row--disabled .feature-status {
  color: var(--color-transparent-white-50);
}

.step-2-spacer {
  flex: 1;
  min-height: 20px;
}

/* Sticky Footer CTA */
.cta-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  background: linear-gradient(
    180deg,
    rgba(10, 10, 10, 0) 0%,
    rgba(10, 10, 10, 0.8) 40%,
    rgba(10, 10, 10, 1) 100%
  );
  backdrop-filter: blur(10px);
  z-index: 100;
  max-width: 500px;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
}

.cta-footer--visible {
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.4);
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .plan-card,
  .billing-card,
  .feature-row {
    transition: none;
  }

  .step-content {
    animation: none;
  }
}

/* Dark mode (already in place, but explicitly set) */
@media (prefers-color-scheme: dark) {
  .paywall {
    background: var(--color-gray-900);
    color: var(--color-text-boldest);
  }
}
</style>
