<template>
  <div class="preview-page">
    <div
      class="device-shell"
      :style="deviceShellStyle"
    >
      <div class="device-screen">
        <!-- Status bar -->
        <div class="status-bar" :class="{ 'status-bar--tablet': isTablet }">
          <span class="status-time">9:41</span>
          <div v-if="!isTablet" class="dynamic-island" />
          <div class="status-icons">
            <svg class="status-icon" width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
              <rect x="0" y="7" width="3" height="5" rx="0.5" opacity="0.4" />
              <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5" opacity="0.6" />
              <rect x="9" y="2" width="3" height="10" rx="0.5" opacity="0.8" />
              <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
            </svg>
            <svg class="status-icon" width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 3.2C10 3.2 11.8 4 13.1 5.3L14.2 4.2C12.5 2.5 10.4 1.5 8 1.5S3.5 2.5 1.8 4.2L2.9 5.3C4.2 4 6 3.2 8 3.2Z" opacity="0.5" />
              <path d="M8 6.4C9.2 6.4 10.3 6.9 11.1 7.6L12.2 6.5C11 5.5 9.6 4.9 8 4.9S5 5.5 3.8 6.5L4.9 7.6C5.7 6.9 6.8 6.4 8 6.4Z" opacity="0.7" />
              <path d="M8 9.5C8.7 9.5 9.3 9.8 9.8 10.2L8 12L6.2 10.2C6.7 9.8 7.3 9.5 8 9.5Z" />
            </svg>
            <svg class="status-icon" width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
              <rect x="0" y="1" width="21" height="10" rx="2" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4" />
              <rect x="1.5" y="2.5" width="17" height="7" rx="1" />
              <path d="M23 4.5V7.5C23.8 7.1 23.8 4.9 23 4.5Z" opacity="0.4" />
            </svg>
          </div>
        </div>

        <iframe
          :src="iframeSrc"
          class="device-iframe"
          frameborder="0"
          @load="hideIframeScrollbar"
        />

        <!-- Home indicator -->
        <div class="home-indicator-area">
          <div class="home-indicator-pill" />
        </div>
      </div>
    </div>

    <!-- Floating toggle button (always in same position) -->
    <button
      class="fab-toggle"
      @click="panelOpen = !panelOpen"
    >
      <CcIcon
        :name="panelOpen ? 'mark-cross' : 'utility-cogwheel'"
        :size="20"
      />
    </button>

    <!-- Floating control panel (opens below the button) -->
    <Transition name="panel">
      <div v-if="panelOpen" class="control-panel">
        <div class="control-section control-section--row">
          <div class="control-label">Image</div>
          <CcSwitch v-model="showImage" />
        </div>

        <div class="control-section control-section--row">
          <div class="control-label">Trial Eligible</div>
          <CcSwitch v-model="trialEligible" />
        </div>

        <div class="control-section">
          <div class="control-label">Orientation</div>
          <CcSegmentedControl
            :labels="['Portrait', 'Landscape']"
            :selected="selectedOrientation === 'portrait' ? 0 : 1"
            size="small"
            fullWidth
            @segment-clicked="selectedOrientation = $event === 0 ? 'portrait' : 'landscape'"
          />
        </div>

        <div class="control-section">
          <div class="control-label">Device</div>
          <CcSelect
            v-model="selectedDevice"
            :options="deviceSelectOptions"
          />
        </div>

        <div class="control-section">
          <div class="control-label">Language</div>
          <CcSelect
            v-model="selectedLang"
            :options="languageOptions"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CcIcon, CcSegmentedControl, CcSelect, CcSwitch } from '@chesscom/design-system'
import type { LangCode } from './translations'

interface DeviceSpec {
  id: string
  label: string
  w: number
  h: number
}

const devices: DeviceSpec[] = [
  { id: 'phone-sm', label: 'Phone Small', w: 360, h: 640 },
  { id: 'phone-md', label: 'Phone Medium', w: 390, h: 844 },
  { id: 'phone-lg', label: 'Phone Large', w: 430, h: 932 },
  { id: 'tablet-sm', label: 'Tablet Small', w: 810, h: 1080 },
  { id: 'tablet-md', label: 'Tablet Medium', w: 800, h: 1280 },
  { id: 'tablet-lg', label: 'Tablet Large', w: 1024, h: 1366 },
]

const showImage = ref(true)
const selectedDevice = ref('phone-md')
const selectedOrientation = ref<'portrait' | 'landscape'>('portrait')
const panelOpen = ref(true)
const trialEligible = ref(true)
const selectedLang = ref<LangCode>('en')

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'German' },
  { value: 'uk', label: 'Ukrainian' },
]

const deviceSelectOptions = devices.map(d => ({
  value: d.id,
  label: `${d.label} (${d.w}×${d.h})`,
}))

const activeDevice = computed(() =>
  devices.find(d => d.id === selectedDevice.value)!
)

const isTablet = computed(() =>
  selectedDevice.value.startsWith('tablet')
)

const deviceWidth = computed(() =>
  selectedOrientation.value === 'portrait'
    ? activeDevice.value.w
    : activeDevice.value.h
)

const deviceHeight = computed(() =>
  selectedOrientation.value === 'portrait'
    ? activeDevice.value.h
    : activeDevice.value.w
)

const deviceShellStyle = computed(() => ({
  width: `${deviceWidth.value}px`,
  height: `${deviceHeight.value}px`,
}))

const iframeSrc = computed(() => {
  const params = new URLSearchParams({
    eligible: String(trialEligible.value),
    lang: selectedLang.value,
    image: String(showImage.value),
  })
  return `/a?${params}`
})

function hideIframeScrollbar(event: Event) {
  try {
    const iframe = event.target as HTMLIFrameElement
    const doc = iframe.contentDocument
    if (!doc) return
    const style = doc.createElement('style')
    style.textContent = `
      html { scrollbar-width: none !important; }
      html::-webkit-scrollbar { display: none !important; }
    `
    doc.head.appendChild(style)
  } catch {
    // cross-origin -- ignore
  }
}
</script>

<style scoped>
.preview-page {
  width: 100%;
  min-height: 100vh;
  background-color: #312E2B;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  position: relative;
  overflow: auto;
}

/* --- Device shell --- */
.device-shell {
  border-radius: 40px;
  border: 3px solid var(--color-border-default);
  background: #312E2B;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: width 0.35s ease, height 0.35s ease;
  flex-shrink: 0;
}

.device-screen {
  width: 100%;
  height: 100%;
  position: relative;
  background: transparent;
  overflow: hidden;
}

/* --- Status bar --- */
.status-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 24px 0;
  color: rgba(255, 255, 255, 0.85);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
  background: transparent;
  z-index: 1;
  pointer-events: none;
}

.status-bar--tablet {
  height: 24px;
  padding: 4px 16px 0;
  font-size: 12px;
}

.status-time {
  min-width: 54px;
}

.dynamic-island {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 126px;
  height: 37px;
  background: #000;
  border-radius: 20px;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.85);
}

.status-icon {
  display: block;
}

.device-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  color-scheme: dark;
}

/* --- Home indicator --- */
.home-indicator-area {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 34px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  background: transparent;
  z-index: 1;
  pointer-events: none;
}

.home-indicator-pill {
  width: 134px;
  height: 5px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.3);
}

/* --- Floating toggle button --- */
.fab-toggle {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(40, 38, 36, 0.92);
  backdrop-filter: blur(12px);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  transition: background 0.15s ease, transform 0.15s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.fab-toggle:hover {
  background: rgba(60, 56, 52, 0.95);
}

/* --- Floating control panel --- */
.control-panel {
  position: fixed;
  top: 88px;
  right: 24px;
  width: 260px;
  max-height: none;
  background: rgba(40, 38, 36, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.control-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-label {
  font-family: var(--font-family-system);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.45);
}

.control-section--row {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

/* --- Panel transition --- */
.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.96);
}
</style>
