<script setup lang="ts">
import { ref, computed } from 'vue'
import { getTranslations, type LangCode } from './translations'
// Separated layers for animation — Diamond & Platinum use Figma SVGs, Gold uses PNGs
import GemDiamond from '../assets/figma/layers/diamond-gem.svg?url'
import GemPlatinum from '../assets/figma/layers/platinum-gem.svg?url'
import GemGold from '../assets/figma/layers/gold-gem.svg?url'
// Diamond SVG assets from Figma
import DiamondGlow from '../assets/figma/layers/diamond-glow.svg?url'
import DiamondShadow from '../assets/figma/layers/diamond-shadow.svg?url'
import DiamondSparkleBig from '../assets/figma/layers/diamond-sparkle-big.svg?url'
import DiamondSparkleSmall from '../assets/figma/layers/diamond-sparkle-small.svg?url'
import DiamondIcon1 from '../assets/figma/layers/diamond-icon1-svg.svg?url'
import DiamondIcon2 from '../assets/figma/layers/diamond-icon2-svg.svg?url'
import DiamondIcon3 from '../assets/figma/layers/diamond-icon3-svg.svg?url'
import DiamondIcon4 from '../assets/figma/layers/diamond-icon4-svg.svg?url'
// Platinum SVG assets from Figma
import PlatinumGlow from '../assets/figma/layers/platinum-glow.svg?url'
import PlatinumShadow from '../assets/figma/layers/platinum-shadow.svg?url'
import PlatinumSparkleBig from '../assets/figma/layers/platinum-sparkle-big.svg?url'
import PlatinumSparkleSmall from '../assets/figma/layers/platinum-sparkle-small.svg?url'
import PlatinumIcon1 from '../assets/figma/layers/platinum-icon1-svg.svg?url'
import PlatinumIcon2 from '../assets/figma/layers/platinum-icon2-svg.svg?url'
import PlatinumIcon3 from '../assets/figma/layers/platinum-icon3-svg.svg?url'
import PlatinumIcon4 from '../assets/figma/layers/platinum-icon4-svg.svg?url'
// Gold SVG assets from Figma
import GoldGlow from '../assets/figma/layers/gold-glow.svg?url'
import GoldShadow from '../assets/figma/layers/gold-shadow.svg?url'
import GoldSparkleBig from '../assets/figma/layers/gold-sparkle-big.svg?url'
import GoldSparkleSmall from '../assets/figma/layers/gold-sparkle-small.svg?url'
import GoldSparkle1 from '../assets/figma/layers/gold-sparkle-1.svg?url'
import GoldSparkle2 from '../assets/figma/layers/gold-sparkle-2.svg?url'
import GoldSparkle3 from '../assets/figma/layers/gold-sparkle-3.svg?url'
import GoldSparkle4 from '../assets/figma/layers/gold-sparkle-4.svg?url'
import GoldIcon1 from '../assets/figma/layers/gold-icon1-svg.svg?url'
import GoldIcon2 from '../assets/figma/layers/gold-icon2-svg.svg?url'
import GoldIcon3 from '../assets/figma/layers/gold-icon3-svg.svg?url'
import GoldIcon4 from '../assets/figma/layers/gold-icon4-svg.svg?url'
import { CcButton, CcIcon, CcIconButton } from '@chesscom/design-system'
import MembershipIcon from './MembershipIcon.vue'

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
    variant?: 'a' | 'b'
  }>(),
  {
    lang: 'en',
    platform: 'ios',
    showImage: true,
    deviceId: 'iphone-15-pro',
    orientation: 'portrait',
    trialEligible: false,
    variant: 'a',
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

// Device detection
const isTablet = computed(() => {
  return props.deviceId?.includes('tablet') ?? false
})

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

// Features list for phone view — order depends on selected tier
const baseFeatures = [
  { id: 'puzzles', icon: 'game-type-puzzle', color: '#E8833A' },
  { id: 'lessons', icon: 'game-lesson', color: '#48A8B5' },
  { id: 'bots', icon: 'game-type-computer', color: '#7B9AAE' },
  { id: 'playCoach', icon: 'game-lesson-student', color: '#8BA84B' },
  { id: 'noAds', icon: 'circle-block', color: '#D04040' },
  { id: 'gameReview', icon: 'move-circle-best', color: '#81B64C' },
  { id: 'moveExplanations', icon: 'move-circle-brilliant', color: '#48B088' },
  { id: 'insights', icon: 'device-bulb-glow', color: '#F5C342' },
] as const

const diamondFeatures = [
  { id: 'moveExplanations', icon: 'move-circle-brilliant', color: '#48B088' },
  { id: 'gameReview', icon: 'move-circle-best', color: '#81B64C' },
  { id: 'insights', icon: 'device-bulb-glow', color: '#F5C342' },
  { id: 'puzzles', icon: 'game-type-puzzle', color: '#E8833A' },
  { id: 'lessons', icon: 'game-lesson', color: '#48A8B5' },
  { id: 'bots', icon: 'game-type-computer', color: '#7B9AAE' },
  { id: 'playCoach', icon: 'game-lesson-student', color: '#8BA84B' },
  { id: 'noAds', icon: 'circle-block', color: '#D04040' },
] as const

const allFeatures = computed(() => selectedTier.value === 'diamond' ? diamondFeatures : baseFeatures)

// Feature inclusion matrix
const featureMatrix: Record<TierType, Record<string, boolean>> = {
  diamond: {
    puzzles: true, lessons: true, bots: true, playCoach: true,
    noAds: true, gameReview: true, moveExplanations: true, insights: true, coursesPerks: true,
  },
  platinum: {
    puzzles: true, lessons: true, bots: true, playCoach: true,
    noAds: true, gameReview: true, moveExplanations: false, insights: false, coursesPerks: false,
  },
  gold: {
    puzzles: true, lessons: true, bots: true, playCoach: true,
    noAds: true, gameReview: false, moveExplanations: false, insights: false, coursesPerks: false,
  },
}

// Computed properties
const currentHeadline = computed(() => {
  return props.trialEligible ? 'Get 1 Week of Premium for Free' : 'Get the Very Best of Chess'
})

const currentCtaText = computed(() => {
  if (currentStep.value === 2) return props.trialEligible ? 'Start my free week' : 'Go Premium'
  const strings = props.trialEligible ? t.value.trialEligible : t.value.notTrialEligible
  return strings.cta
})

const hasFeature = (featureName: string, tier?: TierType): boolean => {
  const t = tier ?? selectedTier.value
  return featureMatrix[t]?.[featureName] ?? false
}

const featureLabel = (featureName: string) => {
  return t.value.features[featureName as keyof typeof t.value.features]
}

// Methods
const goToStep2 = () => { currentStep.value = 2 }
const goToStep1 = () => { currentStep.value = 1; emit('back') }
const selectTier = (tier: TierType) => { selectedTier.value = tier }
const selectBilling = (billing: BillingType) => { selectedBilling.value = billing }
const handleCta = () => { emit('selectPlan', { tier: selectedTier.value, billing: selectedBilling.value }) }
const formatPrice = (price: number) => price.toFixed(2)


// Layer images for animation
const gemImages: Record<TierType, string> = {
  diamond: GemDiamond,
  platinum: GemPlatinum,
  gold: GemGold,
}
const iconImages: Record<TierType, string[]> = {
  diamond: [DiamondIcon1, DiamondIcon2, DiamondIcon3, DiamondIcon4],
  platinum: [PlatinumIcon1, PlatinumIcon2, PlatinumIcon3, PlatinumIcon4],
  gold: [GoldIcon1, GoldIcon2, GoldIcon3, GoldIcon4],
}
const currentGem = computed(() => gemImages[selectedTier.value])
const currentIcons = computed(() => iconImages[selectedTier.value])

// SVG overlay assets (diamond & platinum have dedicated Figma exports; gold uses CSS fallbacks)
const glowImages: Record<TierType, string | null> = {
  diamond: DiamondGlow,
  platinum: PlatinumGlow,
  gold: GoldGlow,
}
const shadowImages: Record<TierType, string | null> = {
  diamond: DiamondShadow,
  platinum: PlatinumShadow,
  gold: GoldShadow,
}
const sparkleBigImages: Record<TierType, string | null> = {
  diamond: DiamondSparkleBig,
  platinum: PlatinumSparkleBig,
  gold: GoldSparkleBig,
}
const sparkleSmallImages: Record<TierType, string | null> = {
  diamond: DiamondSparkleSmall,
  platinum: PlatinumSparkleSmall,
  gold: GoldSparkleSmall,
}
const currentGlowSvg = computed(() => glowImages[selectedTier.value])
const currentShadowSvg = computed(() => shadowImages[selectedTier.value])
const currentSparkleBig = computed(() => sparkleBigImages[selectedTier.value])
const currentSparkleSmall = computed(() => sparkleSmallImages[selectedTier.value])
const goldSparkles = [GoldSparkle1, GoldSparkle2, GoldSparkle3, GoldSparkle4]
</script>

<template>
  <div class="paywall" :class="{ 'paywall--tablet': isTablet }" :data-step="currentStep" :data-lang="lang" :data-platform="platform" :data-orientation="orientation">

    <!-- ════════════════════════════════════════════════ -->
    <!-- STEP 1: Plan Selection (shared phone + tablet)  -->
    <!-- ════════════════════════════════════════════════ -->
    <div v-if="currentStep === 1" class="step-content step-1">
      <!-- Back Button (outside inner for tablet left-align) -->
      <nav class="paywall-nav">
        <CcIconButton
          :icon="{ name: 'arrow-line-left', variant: 'glyph' }"
          variant="ghost"
          size="medium"
          @click="emit('back')"
        />
      </nav>

      <div class="step-1-inner">
        <!-- Title -->
        <h1 class="paywall-title">{{ currentHeadline }}</h1>

        <!-- Hero Image — layered animation -->
        <div v-if="showImage" class="hero-image-container">
          <div :key="selectedTier" class="hero-anim" :class="`hero-anim--${selectedTier}`">
            <!-- Layer 0: Glow — Figma SVG for diamond, CSS fallback for others -->
            <img v-if="currentGlowSvg" :src="currentGlowSvg" alt="" class="hero-glow hero-glow--svg" />
            <div v-else class="hero-glow" />
            <!-- Layer 1: Gem — always visible first -->
            <img :src="currentGem" alt="" class="hero-layer hero-layer--gem" />
            <!-- Layer 2: Shadow — Figma SVG for diamond, CSS fallback for others -->
            <img v-if="currentShadowSvg" :src="currentShadowSvg" alt="" class="hero-shadow hero-shadow--svg" />
            <div v-else class="hero-shadow" />
            <!-- Layer 3: Icons — appear one by one -->
            <img :src="currentIcons[0]" alt="" class="hero-layer hero-layer--icon hero-icon--1" />
            <img :src="currentIcons[1]" alt="" class="hero-layer hero-layer--icon hero-icon--2" />
            <img :src="currentIcons[2]" alt="" class="hero-layer hero-layer--icon hero-icon--3" />
            <img :src="currentIcons[3]" alt="" class="hero-layer hero-layer--icon hero-icon--4" />
            <!-- Layer 4: Sparkles — on gem corners, appear one by one -->
            <!-- Gold: 4 sparkles -->
            <template v-if="selectedTier === 'gold'">
              <img v-for="(src, idx) in goldSparkles" :key="'gs'+idx" :src="src" alt="" class="hero-sparkle-img" :class="`hero-sparkle--${idx + 1}`" />
            </template>
            <!-- Diamond & Platinum: 2 sparkles -->
            <template v-else>
              <img v-if="currentSparkleBig" :src="currentSparkleBig" alt="" class="hero-sparkle-img hero-sparkle--1" />
              <img v-if="currentSparkleSmall" :src="currentSparkleSmall" alt="" class="hero-sparkle-img hero-sparkle--2" />
            </template>
          </div>
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
            <span v-if="plan.id === 'diamond'" class="plan-card-chip">Most popular</span>
            <div class="plan-card-icon">
              <MembershipIcon :tier="plan.id" :size="40" />
            </div>
            <div class="plan-card-content">
              <span class="plan-card-title">{{ plan.name }}</span>
              <span class="plan-card-description">{{ plan.description }}</span>
            </div>
          </div>
        </div>

        <div class="step-spacer" />
      </div>
    </div>

    <!-- ════════════════════════════════════════════════ -->
    <!-- STEP 2: Billing + Features (phone & tablet)    -->
    <!-- ════════════════════════════════════════════════ -->
    <div v-else-if="currentStep === 2" class="step-content step-2" :class="{ 'step-2--variant-b': variant === 'b' }">
      <!-- Back Button -->
      <nav class="paywall-nav">
        <CcIconButton
          :icon="{ name: 'arrow-line-left', variant: 'glyph' }"
          variant="ghost"
          size="medium"
          @click="goToStep1"
        />
      </nav>

      <!-- Title Group -->
      <div class="step-2-title-group">
        <h1 class="paywall-title">{{ currentHeadline }}</h1>
      </div>

      <!-- Section: Billing + Benefits -->
      <div class="step-2-section">
        <!-- Billing Cards — Variant A (compact, side-by-side layout) -->
        <div v-if="variant === 'a'" class="billing-cards-container">
          <!-- Yearly -->
          <div
            class="billing-card"
            :class="{ 'billing-card--selected': selectedBilling === 'yearly' }"
            @click="selectBilling('yearly')"
            role="button" tabindex="0"
          >
            <div class="billing-card-inner">
              <div class="billing-card-left">
                <span class="billing-card-label">{{ t.yearly }}</span>
                <span class="billing-card-subtext">
                  billed annually, ${{ formatPrice(pricing[selectedTier].yearly.monthlyRate) }}/month
                </span>
              </div>
              <div class="billing-card-right">
                <span class="billing-card-price-old">
                  ${{ formatPrice(pricing[selectedTier].monthly.monthlyRate) }} / month
                </span>
                <span class="billing-card-price">
                  ${{ formatPrice(pricing[selectedTier].yearly.annualTotal) }} / year
                </span>
              </div>
            </div>
          </div>
          <!-- Monthly -->
          <div
            class="billing-card"
            :class="{ 'billing-card--selected': selectedBilling === 'monthly' }"
            @click="selectBilling('monthly')"
            role="button" tabindex="0"
          >
            <div class="billing-card-inner">
              <div class="billing-card-left">
                <span class="billing-card-label">{{ t.monthly }}</span>
              </div>
              <div class="billing-card-right">
                <span class="billing-card-price">
                  ${{ formatPrice(pricing[selectedTier].monthly.monthlyRate) }} / month
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Cards — Variant B (tall, stacked layout) -->
        <div v-else class="billing-cards-container billing-cards-container--b">
          <!-- Yearly -->
          <div
            class="billing-card billing-card--b-yearly"
            :class="{ 'billing-card--selected': selectedBilling === 'yearly' }"
            @click="selectBilling('yearly')"
            role="button" tabindex="0"
          >
            <div class="billing-card-inner billing-card-inner--b">
              <span class="billing-card-chip-value">Best Value</span>
              <span class="billing-card-label-b">{{ t.yearly }}</span>
              <div class="billing-card-pricing-b">
                <span class="billing-card-price-old">
                  ${{ formatPrice(pricing[selectedTier].monthly.monthlyRate) }} / month
                </span>
                <span class="billing-card-price-b">
                  ${{ formatPrice(pricing[selectedTier].yearly.annualTotal) }} / year
                </span>
                <span class="billing-card-subtext">
                  billed annually, ${{ formatPrice(pricing[selectedTier].yearly.monthlyRate) }}/month
                </span>
              </div>
            </div>
          </div>
          <!-- Monthly -->
          <div
            class="billing-card billing-card--b-monthly"
            :class="{ 'billing-card--selected': selectedBilling === 'monthly' }"
            @click="selectBilling('monthly')"
            role="button" tabindex="0"
          >
            <div class="billing-card-inner billing-card-inner--b">
              <span class="billing-card-label-b">{{ t.monthly }}</span>
              <span class="billing-card-price-b">
                ${{ formatPrice(pricing[selectedTier].monthly.monthlyRate) }} / month
              </span>
            </div>
          </div>
        </div>

        <!-- Benefits Card (Variant A only) -->
        <div v-if="variant === 'a'" class="benefits-card-wrapper">
          <!-- Pill Header -->
          <div class="benefits-pill">
            <MembershipIcon :tier="selectedTier" :size="12" />
            <span class="benefits-pill-text">
              Unlimited with <span class="benefits-pill-tier" :class="`benefits-pill-tier--${selectedTier}`">{{ t.tiers[selectedTier] }} Plan:</span>
            </span>
          </div>

          <!-- Card -->
          <div class="benefits-card">
            <div
              v-for="(feature, idx) in allFeatures"
              :key="feature.id"
              class="benefit-item"
              :class="{ 'benefit-item--disabled': !hasFeature(feature.id), 'benefit-item--last': idx === allFeatures.length - 1 }"
            >
              <div class="benefit-item-icon" :style="{ color: hasFeature(feature.id) ? feature.color : undefined }">
                <CcIcon :name="feature.icon" variant="glyph" :size="16" />
              </div>
              <span class="benefit-item-name">{{ featureLabel(feature.id) }}</span>
              <div class="benefit-item-check">
                <CcIcon v-if="hasFeature(feature.id)" name="mark-check" variant="glyph" :size="16" />
                <CcIcon v-else name="mark-cross" variant="glyph" :size="16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="step-spacer" />
    </div>

    <!-- ════════════════════════════════════════════════ -->
    <!-- FOOTER                                          -->
    <!-- ════════════════════════════════════════════════ -->

    <!-- Footer CTA -->
    <div class="cta-footer" :class="{ 'cta-footer--tablet': isTablet }">
      <div class="cta-buttons">
        <CcButton
          :label="currentCtaText"
          variant="monetization"
          size="x-large"
          fullWidth
          @click="currentStep === 1 ? goToStep2() : handleCta()"
        />
      </div>
      <div class="cta-home-indicator">
        <div class="cta-home-indicator-pill" />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ═══════════════════════════════════════
   BASE LAYOUT
   ═══════════════════════════════════════ */
.paywall {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(--color-gray-900, #262421);
  color: var(--color-text-boldest, #fff);
  font-family: 'Inter', var(--font-family-system, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  overflow-x: hidden;
  position: relative;
}

.step-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px 12px 0 12px;
  animation: fadeSlide 0.1s cubic-bezier(0, 0, 0.4, 1);
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.step-1 { animation-name: slideFromLeft; }
.step-2 { animation-name: slideFromRight; }

@keyframes slideFromLeft {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideFromRight {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

.step-spacer { flex: 1; min-height: 20px; }

/* ═══════════════════════════════════════
   NAV BAR (back button)
   ═══════════════════════════════════════ */
.paywall-nav {
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  padding: 0;
  margin-bottom: 16px;
}

/* ═══════════════════════════════════════
   TITLE
   ═══════════════════════════════════════ */
.paywall-title {
  font-family: var(--font-family-heading, 'Chess Sans', sans-serif);
  font-size: 22px;
  font-weight: 800;
  line-height: 28px;
  text-align: center;
  margin: 0 0 24px 0;
  max-width: 270px;
  margin-left: auto;
  margin-right: auto;
  color: var(--color-text-boldest, #fff);
}

/* ═══════════════════════════════════════
   STEP 1: PLAN SELECTION
   ═══════════════════════════════════════ */

/* Center content column — max-width matches Figma "Plans 1" container */
.step-1-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 476px;
  margin: 0 auto;
  flex: 1;
}

/* Hero Image — Frame 238 in Figma: fills parent width, fixed 217px height on phones */
.hero-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 280px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 8px;
  overflow: visible;
}

/* Tablet hero image: constrain illustration size */
.paywall--tablet .hero-image-container {
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -8px;
}

/* ═══════════════════════════════════════════════════
   HERO ANIMATION — Layered: Gem → Shadow+Glow → Icons → Sparkles
   Sequence (~2.2s):
   1. Gem visible immediately
   2. Glow fades in behind gem + shadow flows down (0.1–0.7s)
   3. Icons appear one by one (0.3–1.2s)
   4. Sparkles twinkle (1.0–1.8s)
   ═══════════════════════════════════════════════════ */
.hero-anim {
  position: relative;
  width: 100%;
  aspect-ratio: 291 / 202;
}

/* Shared layer base */
.hero-layer {
  position: absolute;
  pointer-events: none;
}

/* Glow — subtle radial behind the gem center (CSS fallback for platinum/gold) */
.hero-glow {
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 42%;
  width: 60%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%) scale(0.5);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  will-change: opacity, transform;
}
/* Glow — Figma SVG version (diamond): visible immediately */
.hero-glow--svg {
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 42%;
  width: 60%;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: none;
  opacity: 0;
}

/* Gem — centered, sized to match Figma proportions (140/291 ≈ 48%) */
.hero-layer--gem {
  z-index: 3;
  left: 50%;
  top: 42%;
  width: 48%;
  height: auto;
  transform: translate(-50%, -50%);
}

/* Shadow — ellipse under the gem, flows downward (CSS fallback for platinum/gold) */
.hero-shadow {
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 60%;
  width: 46%;
  height: 16%;
  transform: translateX(-50%) scaleY(0);
  transform-origin: center top;
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
}
/* Shadow — Figma SVG version (diamond): bow-tie ray pattern below gem tip */
.hero-shadow--svg {
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 72%;
  width: 46%;
  height: auto;
  border-radius: 0;
  transform: translate(-50%, -30%);
  pointer-events: none;
  opacity: 0;
  clip-path: inset(0 0 100% 0);
}

/* Icon layers — start hidden behind gem center, slide outward to final position */
.hero-layer--icon {
  z-index: 2;
  opacity: 0;
  will-change: opacity, transform;
}

/* Icon positions + fly-from-diamond offsets — matched to Figma (291×202 frame) */
/* Each icon starts hidden behind the gem center (~50%, ~38%) and flies outward */
.hero-icon--1 { left: 6%;  top: 12%;  width: 14%; height: auto; --dx: 180%; --dy: 130%; }
.hero-icon--2 { left: 2%;  top: 48%;  width: 22%; height: auto; --dx: 150%; --dy: -30%; }
.hero-icon--3 { left: 80%; top: 12%;  width: 14%; height: auto; --dx: -140%; --dy: 140%; }
.hero-icon--4 { left: 74%; top: 48%;  width: 22%; height: auto; --dx: -120%; --dy: -30%; }

/* Sparkle container */
.hero-sparkles {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
}

/* Sparkle — individual SVGs positioned on gem facets to match Figma */
.hero-sparkle-img {
  position: absolute;
  z-index: 4;
  height: auto;
  pointer-events: none;
  opacity: 0;
  will-change: opacity, transform;
}
/* Sparkles positioned at diamond corners */
/* Top — big sparkle, on the facet intersection */
.hero-sparkle--1 {
  left: 52%; top: 23%; width: 9%;
  transform: scale(0);
}
/* Bottom-left corner — small sparkle */
.hero-sparkle--2 {
  left: 38%; top: 52%; width: 5%;
  transform: scale(0);
}
.hero-sparkle--3 {
  left: 28%; top: 60%; width: 6%;
  transform: scale(0);
}
.hero-sparkle--4 {
  left: 58%; top: 35%; width: 10%;
  transform: scale(0);
}

.sparkle {
  position: absolute;
  opacity: 0;
  will-change: opacity, transform;
}

.sparkle--1 { top: 8%;  left: 52%; width: 6px; height: 6px; }
.sparkle--2 { top: 4%;  left: 38%; width: 4px; height: 4px; }
.sparkle--3 { top: 18%; left: 70%; width: 6px; height: 6px; }
.sparkle--4 { top: 50%; left: 78%; width: 5px; height: 5px; }
.sparkle--5 { top: 64%; left: 20%; width: 5px; height: 5px; }
.sparkle--6 { top: 28%; left: 14%; width: 4px; height: 4px; }

/* 4-point star shape */
.sparkle::before,
.sparkle::after {
  content: '';
  position: absolute;
  background: inherit;
  border-radius: 1px;
}
.sparkle::before {
  width: 100%;
  height: 2px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.sparkle::after {
  width: 2px;
  height: 100%;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}

/* ═══════════════ DIAMOND ═══════════════ */
/* Chess.com motion tokens: ease-out-strong (0,0,0.4,1), standard 200ms / faster 100ms */
.hero-anim--diamond .hero-glow--svg { top: 38%; animation: glow-appear-subtle 0.2s 0.15s cubic-bezier(0, 0, 0.4, 1) both; }
.hero-anim--diamond .hero-layer--gem { top: 38%; }
.hero-anim--diamond .hero-shadow--svg {
  top: 66%;
  animation: shadow-svg-reveal 0.2s 0s cubic-bezier(0, 0, 0.4, 1) both;
}
.hero-anim--diamond .hero-layer--icon {
  animation: icon-appear 0.2s 0s cubic-bezier(0, 0, 0.4, 1) both;
}
.hero-anim--diamond .hero-sparkle--1 {
  left: 52%; top: 18%; width: 9%;
  animation: sparkle-img-pop 0.1s 0.25s cubic-bezier(0, 0, 0.4, 1) both;
}
.hero-anim--diamond .hero-sparkle--2 {
  left: 36%; top: 39%; width: 5%;
  animation: sparkle-img-pop 0.1s 0.35s cubic-bezier(0, 0, 0.4, 1) both;
}

/* ═══════════════ PLATINUM ═══════════════ */
/* Crown gem is 128x128 (square SVG) — narrower than diamond to match Figma */
.hero-anim--platinum .hero-layer--gem {
  width: 44%;
  top: 40%;
}
.hero-anim--platinum .hero-glow--svg {
  position: absolute; z-index: 0;
  left: 50%; top: 40%; width: 60%;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: none; animation: glow-appear 0.2s 0.15s cubic-bezier(0, 0, 0.4, 1) both;
}
.hero-anim--platinum .hero-shadow--svg {
  top: 55%;
  width: 59%;
  transform: translate(-50%, 0%);
  animation: shadow-svg-reveal 0.2s 0s cubic-bezier(0, 0, 0.4, 1) both;
}
.hero-anim--platinum .hero-layer--icon {
  animation: icon-appear 0.2s 0s cubic-bezier(0, 0, 0.4, 1) both;
}
.hero-anim--platinum .hero-sparkle--1 {
  left: 33%; top: 28%; width: 5%;
  animation: sparkle-img-pop 0.1s 0.25s cubic-bezier(0, 0, 0.4, 1) both;
}
.hero-anim--platinum .hero-sparkle--2 {
  left: 65%; top: 48%; width: 3.5%;
  animation: sparkle-img-pop 0.1s 0.35s cubic-bezier(0, 0, 0.4, 1) both;
}

/* ═══════════════ GOLD ═══════════════ */
/* Star gem is 133x111 — slightly wider aspect ratio */
.hero-anim--gold .hero-layer--gem {
  width: 46%;
  top: 41%;
}
.hero-anim--gold .hero-glow--svg {
  position: absolute; z-index: 0;
  left: 50%; top: 41%; width: 60%;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: none; animation: glow-appear 0.2s 0.15s cubic-bezier(0, 0, 0.4, 1) both;
}
.hero-anim--gold .hero-shadow--svg {
  top: 48%;
  left: 52%;
  width: 46%;
  transform: translate(-50%, -50%);
  opacity: 0;
  clip-path: none;
  animation: gold-shadow-appear 0.2s 0s cubic-bezier(0, 0, 0.4, 1) both;
}
.hero-anim--gold .hero-layer--icon {
  animation: icon-appear 0.2s 0s cubic-bezier(0, 0, 0.4, 1) both;
}
/* Gold 4 sparkles — ON the star surface, matching Figma */
.hero-anim--gold .hero-sparkle--1 { left: 34%; top: 14%; width: 10%; animation: sparkle-img-pop 0.1s 0.25s cubic-bezier(0, 0, 0.4, 1) both; }
.hero-anim--gold .hero-sparkle--2 { left: 57%; top: 10%; width: 8%;  animation: sparkle-img-pop 0.1s 0.3s cubic-bezier(0, 0, 0.4, 1) both; }
.hero-anim--gold .hero-sparkle--3 { left: 35%; top: 40%; width: 9%;  animation: sparkle-img-pop 0.1s 0.35s cubic-bezier(0, 0, 0.4, 1) both; }
.hero-anim--gold .hero-sparkle--4 { left: 49%; top: 15%; width: 18%; rotate: 90deg; animation: sparkle-img-pop 0.1s 0.4s cubic-bezier(0, 0, 0.4, 1) both; }

/* Gold shadow — star silhouette fades in behind gem, no distortion */
@keyframes gold-shadow-appear {
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
  100% { opacity: 0.45; transform: translate(-50%, -50%) scale(1); }
}

/* ═══════════════ SHARED KEYFRAMES ═══════════════ */

/* Glow fades in behind gem — subtle, no scale overshoot */
@keyframes glow-appear {
  0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

/* Shadow flows down from gem base (CSS ellipse fallback for platinum/gold) */
@keyframes shadow-flow {
  0%   { opacity: 0; transform: translateX(-50%) scale(0.1); }
  100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
}

/* Shadow SVG flows top-to-bottom via clip-path */
@keyframes shadow-svg-reveal {
  0%   { opacity: 0; clip-path: inset(0 0 100% 0); }
  10%  { opacity: 0.85; }
  100% { opacity: 0.85; clip-path: inset(0 0 0% 0); }
}

/* Icons fly outward from behind the diamond */
@keyframes icon-appear {
  0%   { opacity: 0; transform: translate(var(--dx, 0), var(--dy, 0)) scale(0.3); }
  100% { opacity: 1; transform: translate(0, 0) scale(1); }
}

/* Sparkle twinkle (CSS fallback for platinum/gold) */
@keyframes sparkle-pop {
  0%   { opacity: 0; transform: scale(0) rotate(0deg); }
  30%  { opacity: 1; transform: scale(1.05) rotate(45deg); }
  60%  { opacity: 0.6; transform: scale(0.7) rotate(90deg); }
  100% { opacity: 0; transform: scale(0.2) rotate(135deg); }
}

/* Sparkle SVG image pop-in and stay (diamond) */
@keyframes sparkle-img-pop {
  0%   { opacity: 0; transform: scale(0); }
  50%  { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.9; transform: scale(1); }
}
@keyframes glow-appear-subtle {
  0%   { opacity: 0; }
  100% { opacity: 0.45; }
}

/* Plan Cards */
.plan-cards-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 476px;
}

.plan-card {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-16, 16px);
  padding: var(--space-16, 16px) var(--space-12, 12px) var(--space-16, 16px) var(--space-24, 24px);
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  box-shadow:
    0px 2px 4px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.14),
    inset 0px 1px 0px 0px rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(50px);
  cursor: pointer;
  transition: background 0.05s cubic-bezier(0, 0, 0.2, 1);
}

.plan-card:hover {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.07) 100%);
}

.plan-card-chip {
  position: absolute;
  top: -13px;
  left: 24px;
  padding: 2px 4px;
  background: var(--color-border-selected, #81b64c);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 3px;
  line-height: 15px;
  min-height: 19px;
  display: flex;
  align-items: center;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
}

.plan-card--selected {
  outline: var(--border-3, 3px) solid var(--color-border-selected, #81b64c);
  outline-offset: var(--space-2, 2px);
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
  min-width: 0;
}

.plan-card-title {
  font-family: var(--font-family-heading, 'Chess Sans', sans-serif);
  font-size: 17px;
  font-weight: 600;
  line-height: 1.18;
  color: var(--color-text-boldest, #fff);
}

.plan-card-description {
  font-family: 'Inter', var(--font-family-system, sans-serif);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.33;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 2px;
}

/* ═══════════════════════════════════════
   STEP 2: BILLING + BENEFITS CARD
   ═══════════════════════════════════════ */

.step-2-title-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.step-2-title-group .paywall-title {
  margin: 0;
}

.step-2-subtitle {
  font-family: var(--font-family-body, 'Inter', sans-serif);
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
}

.step-2-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 0;
  width: 100%;
  margin-top: 24px;
}
.step-2--variant-b .step-2-section {
  margin-top: 32px;
}

/* Billing Cards */
.billing-cards-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 476px;
}

.billing-card {
  position: relative;
  width: 100%;
  height: 80px;
  cursor: pointer;
}

.billing-card-inner {
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  box-shadow:
    0px 2px 4px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.14),
    inset 0px 1px 0px 0px rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(50px);
  transition: background 0.05s cubic-bezier(0, 0, 0.2, 1);
}

.billing-card:hover .billing-card-inner {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.07) 100%);
}

.billing-card--selected::after {
  content: '';
  position: absolute;
  inset: -4px;
  border: 2px solid var(--color-border-selected, #81b64c);
  border-radius: 14px;
  pointer-events: none;
}

.billing-card-left {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  min-height: 48px;
}

.billing-card-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  justify-content: center;
  min-height: 48px;
  text-align: center;
  white-space: nowrap;
}

.billing-card-label {
  font-family: var(--font-family-heading, 'Chess Sans', sans-serif);
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  color: var(--color-text-boldest, #fff);
}

.billing-card-subtext {
  font-family: var(--font-family-body, 'Inter', sans-serif);
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  color: rgba(255, 255, 255, 0.5);
}

.billing-card-price {
  font-family: var(--font-family-heading, 'Chess Sans', sans-serif);
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  color: var(--color-text-boldest, #fff);
}

.billing-card-price-old {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
}

/* ─── Variant B billing card overrides ─── */
.billing-cards-container--b {
  gap: 16px;
}

.billing-card--b-yearly {
  height: auto;
}

.billing-card--b-monthly {
  height: auto;
}

.billing-card-inner--b {
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  height: auto;
  padding: 16px;
  position: relative;
}

.billing-card--b-yearly .billing-card-inner--b {
  gap: 7px;
}

.billing-card--b-monthly .billing-card-inner--b {
  gap: 8px;
}

.billing-card-inner--b .billing-card-left,
.billing-card-inner--b .billing-card-right {
  min-height: 0;
}

.billing-card-label-b {
  font-family: var(--font-family-heading, 'Chess Sans', sans-serif);
  font-size: 22px;
  font-weight: 700;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.85);
}

.billing-card-pricing-b {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.billing-card-pricing-b .billing-card-price-old {
  margin-bottom: 8px;
}

.billing-card-pricing-b .billing-card-price-b {
  margin-bottom: 4px;
}

.billing-card-price-b {
  font-family: var(--font-family-heading, 'Chess Sans', sans-serif);
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.85);
}

.billing-card-chip-value {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 2px 4px;
  background: rgba(48, 87, 48, 0.3);
  color: #81b64c;
  font-family: var(--font-family-body, 'Inter', sans-serif);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 3px;
  line-height: 15px;
  text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);
}

/* Benefits Card */
.benefits-card-wrapper {
  position: relative;
  width: 100%;
  max-width: 476px;
  padding-top: 15px;
}

.benefits-pill {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 30px;
  padding: 0 12px;
  border-radius: 20px;
  background: var(--color-bg-primary, #312e2b);
  border: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}

.benefits-pill-text {
  font-family: var(--font-family-body, 'Inter', sans-serif);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.72);
}

.benefits-pill-tier--diamond {
  color: #4dc3ea;
}

.benefits-pill-tier--platinum {
  color: #d0e6fb;
}

.benefits-pill-tier--gold {
  color: #fad541;
}

.benefits-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.06);
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 35px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.benefit-item:first-child {
  margin-top: 13px;
}

.benefit-item--last {
  height: 48px;
  border-bottom: none;
}

.benefit-item--disabled .benefit-item-name {
  color: rgba(255, 255, 255, 0.5);
}

.benefit-item-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.benefit-item--disabled .benefit-item-icon {
  color: rgba(255, 255, 255, 0.35) !important;
  opacity: 0.5;
}

.benefit-item-name {
  flex: 1;
  font-family: var(--font-family-body, 'Inter', sans-serif);
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: var(--color-text-boldest, #fff);
}

.benefit-item-check {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: rgba(255, 255, 255, 0.72);
}

.benefit-item--disabled .benefit-item-check {
  color: rgba(255, 255, 255, 0.35);
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */

.cta-footer {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px 16px 12px;
  background: rgba(38, 36, 33, 0.55);
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  z-index: 100;
  margin-top: auto;
  position: relative;
}

.cta-footer::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  height: 32px;
  background: linear-gradient(to bottom, transparent, rgba(38, 36, 33, 0.55));
  pointer-events: none;
}

.cta-footer .cta-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
}

.cta-footer .cta-home-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
  padding-top: 0;
}

.cta-footer .cta-home-indicator-pill {
  width: 134px;
  height: 5px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.25);
}

.cta-footer--tablet .cta-buttons {
  max-width: 500px;
}

/* ═══════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .step-content { animation: none; }
  .plan-card, .billing-card { transition: none; }
  .hero-layer--icon,
  .hero-shadow,
  .hero-shadow--svg,
  .hero-glow,
  .hero-glow--svg,
  .hero-sparkle-img,
  .sparkle {
    animation: none !important;
  }
  .hero-layer--icon {
    opacity: 1 !important;
  }
  .hero-sparkle-img {
    opacity: 0.9 !important;
    transform: scale(1) !important;
    transform: scale(1) !important;
  }
  .hero-glow {
    opacity: 1 !important;
    transform: translate(-50%, -50%) scale(1) !important;
  }
  .hero-shadow {
    opacity: 0.8 !important;
    transform: translateX(-50%) scaleY(1) !important;
  }
}
</style>
