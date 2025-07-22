<script setup>
import { computed, nextTick, ref, watch } from 'vue'

// Constants
const GUIDE_CONFIG = {
  WIDTH: 320,
  HEIGHT: 300,
  OFFSET: 20,
  SMALL_ELEMENT_HEIGHT: 200,
  SMALL_ELEMENT_WIDTH: 400,
  POSITION_OFFSET: 10,
}

// Defines the props the component expects to receive.
// 'steps' is an array, required for the component to function.
const props = defineProps({
  steps: {
    type: Array,
    required: true,
  },
})

// Event to close the guide.
const emit = defineEmits(['close'])

// --- Reactive state ---
const currentStepIndex = ref(0) // Tracks the current step in the onboarding guide.
const isActive = ref(true) // Control guide visibility.
const position = ref({
  // Position of the guide on the screen.
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
})

// --- Computed properties ---
// Return the current step for a clean template.
const currentStep = computed(() => props.steps[currentStepIndex.value])

// Check if the current step is the first or last step.
const isFirstStep = computed(() => currentStepIndex.value === 0)
const isLastStep = computed(() => currentStepIndex.value === props.steps.length - 1)

// --- Methods ---
function nextStep() {
  if (!isLastStep.value) {
    currentStepIndex.value++
  } else {
    closeGuide() // If it's the last step, close the guide.
  }
}

function prevStep() {
  if (!isFirstStep.value) {
    currentStepIndex.value--
  }
}

function closeGuide() {
  isActive.value = false
  emit('close') // Emit the close event to the parent component.
}

// Calculate optimal position for the guide
function calculatePosition(targetElement) {
  const rect = targetElement.getBoundingClientRect()
  const guideWidth = GUIDE_CONFIG.WIDTH
  const guideHeight = GUIDE_CONFIG.HEIGHT
  const offset = GUIDE_CONFIG.OFFSET

  // Desired initial position - centered on target element
  let top = rect.top + window.scrollY + rect.height / 2 - guideHeight / 2
  let left = rect.left + window.scrollX + rect.width / 2 - guideWidth / 2

  // For small elements, position below instead of centered
  if (
    rect.height < GUIDE_CONFIG.SMALL_ELEMENT_HEIGHT ||
    rect.width < GUIDE_CONFIG.SMALL_ELEMENT_WIDTH
  ) {
    top = rect.top + window.scrollY + rect.height + GUIDE_CONFIG.POSITION_OFFSET
    left = rect.left + window.scrollX + rect.width / 2 - guideWidth / 2
  }

  // Limit horizontal position
  if (left + guideWidth > window.innerWidth) {
    left = window.innerWidth - guideWidth - offset
  }
  if (left < offset) {
    left = offset
  }

  // Limit vertical position
  if (top + guideHeight > window.innerHeight + window.scrollY) {
    // If not enough space below, position above the element
    top = rect.top + window.scrollY - guideHeight - GUIDE_CONFIG.POSITION_OFFSET
  }
  if (top < window.scrollY + offset) {
    top = window.scrollY + offset
  }

  return {
    top: `${top}px`,
    left: `${left}px`,
    transform: 'none',
  }
}

// --- Watcher for position ---
// This function observes changes in the current step (currentStepIndex)
// and updates the guide position according to the targeted HTML element.
watch(
  currentStep,
  (newStep) => {
    // Wait for the DOM to update before calculating positions.
    nextTick(() => {
      const targetElement = document.getElementById(newStep.targetId)
      if (targetElement) {
        position.value = calculatePosition(targetElement)
      } else {
        // If the target element is not found, center the guide.
        console.warn(`[OnboardingGuide] Element with ID "${newStep.targetId}" not found.`)
        position.value = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }
      }
    })
  },
  { immediate: true },
)
</script>

<template>
  <transition name="fade">
    <div v-if="isActive" class="onboarding-overlay" @click="closeGuide">
      <div class="onboarding-guide" :style="position" @click.stop>
        <img
          v-if="currentStep.imageUrl"
          :src="currentStep.imageUrl"
          alt="Illustration de l'étape"
          class="onboarding-image"
        />

        <h3 class="onboarding-title">{{ currentStep.title }}</h3>

        <p class="onboarding-description">{{ currentStep.description }}</p>

        <div class="onboarding-footer">
          <div class="step-counter">{{ currentStepIndex + 1 }} / {{ steps.length }}</div>
          <div class="onboarding-actions">
            <button v-if="!isFirstStep" @click="prevStep" class="btn-secondary">Précédent</button>
            <button @click="nextStep" class="btn-primary">
              {{ isLastStep ? 'Terminer' : 'Suivant' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.onboarding-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
}

.onboarding-guide {
  position: absolute;
  width: 320px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
}

.onboarding-image {
  width: 60px;
  height: 60px;
  max-width: 100%;
  margin: 0 auto 15px auto;
  display: block;
}

.onboarding-title {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  color: #555;
}

.onboarding-description {
  margin: 0 0 20px 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #555;
  text-align: center;
}

.onboarding-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.step-counter {
  font-size: 0.9rem;
  color: #888;
}

.onboarding-actions {
  display: flex;
  gap: 10px;
}

/* Buttons */
button {
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #611555;
  color: white;
}

.btn-primary:hover {
  background-color: #420e3a;
}

.btn-secondary {
  background-color: #e9ecef;
  color: #333;
}

.btn-secondary:hover {
  background-color: #ced4da;
}

/* Transition style for the guide */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Enlarge/shrink pop-up */
.fade-enter-active .onboarding-guide,
.fade-leave-active .onboarding-guide {
  transition: transform 0.3s ease;
}

.fade-enter-from .onboarding-guide,
.fade-leave-to .onboarding-guide {
  transform: scale(0.95);
}
</style>
