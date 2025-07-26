<template>
  <div class="dashboard">
    <!-- Page header with Guide button -->
    <div class="page-header">
      <h2>Publications</h2>
      <button @click="showGuide = true" id="guide-button" class="guide-button shiny-button">
        ✨ Guide
      </button>
    </div>

    <!-- Main content area -->
    <div class="dashboard-content">
      <!-- Page description -->
      <p>Créez et gérez vos publications sur les réseaux sociaux</p>

      <!-- Publication creation form -->
      <div id="post-editor" class="publication-form">
        <h3>Nouvelle publication</h3>
        <!-- Content textarea -->
        <textarea
          v-model="postContent"
          placeholder="Que souhaitez-vous partager aujourd'hui ?"
          rows="4"
        ></textarea>

        <!-- Platform selection section -->
        <div class="platforms" id="platform-selector">
          <h4>Publier sur :</h4>
          <!-- Platform checkboxes grid -->
          <div class="platform-grid">
            <label v-for="platform in platforms" :key="platform.id">
              <input type="checkbox" :value="platform.id" v-model="selectedPlatforms" />
              <img :src="platform.icon" :alt="platform.name" class="platform-icon" />
              <span>{{ platform.name }}</span>
            </label>
          </div>
        </div>

        <!-- Schedule section -->
        <div id="schedule-section" class="schedule-section">
          <h4>Programmer la publication</h4>
          <div class="schedule-options">
            <label>
              <input type="radio" name="timing" value="now" checked>
              Publier maintenant
            </label>
            <label>
              <input type="radio" name="timing" value="scheduled">
              Programmer
            </label>
          </div>
          <div class="schedule-datetime">
            <input type="datetime-local" v-model="scheduledDate">
          </div>
        </div>

        <!-- Publish button -->
        <button @click="publishPost" class="publish-btn">🚀 Publier maintenant</button>
      </div>

      <!-- Posts history/management section -->
      <div id="posts-list" class="posts-list">
        <h3>Vos publications</h3>
        <div class="posts-grid">
          <div class="post-item">
            <div class="post-status status-published">✅ Publié</div>
            <div class="post-content">Publication de test sur Instagram...</div>
            <div class="post-date">Publié il y a 2 heures</div>
          </div>
          <div class="post-item">
            <div class="post-status status-scheduled">📅 Programmé</div>
            <div class="post-content">Contenu programmé pour demain...</div>
            <div class="post-date">Programmé pour demain 14h</div>
          </div>
          <div class="post-item">
            <div class="post-status status-draft">📝 Brouillon</div>
            <div class="post-content">Brouillon de publication...</div>
            <div class="post-date">Modifié il y a 1 jour</div>
          </div>
        </div>
      </div>
    </div>

    <!-- OnboardingGuide component -->
    <OnboardingGuide v-if="showGuide" :steps="guideSteps" @close="closeGuide" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { publicationsSteps } from '../assets/onboarding'
import OnboardingGuide from '../components/OnboardingGuide.vue'

// Reactive state for onboarding guide
const showGuide = ref(false)
const guideSteps = ref(publicationsSteps)

// Form state
const postContent = ref('')
const selectedPlatforms = ref([])
const scheduledDate = ref('')

// Platform configuration with icons
const platforms = ref([
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'https://cdn-icons-png.flaticon.com/128/4138/4138124.png',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'https://cdn-icons-png.flaticon.com/128/4138/4138125.png',
  },
  { id: 'tiktok', name: 'TikTok', icon: 'https://cdn-icons-png.flaticon.com/128/4138/4138151.png' },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: 'https://cdn-icons-png.flaticon.com/128/4138/4138141.png',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'https://cdn-icons-png.flaticon.com/128/4138/4138130.png',
  },
])

// Methods
// Handle post publication
function publishPost() {
  alert('Publication créée avec succès !')
}

// Show guide automatically on first visit
onMounted(() => {
  const hasSeenPublicationsGuide = localStorage.getItem('hasSeenPublicationsGuide')
  if (!hasSeenPublicationsGuide) {
    showGuide.value = true
  }
})

// Handle guide closure and update localStorage
const closeGuide = () => {
  showGuide.value = false
  localStorage.setItem('hasSeenPublicationsGuide', 'true')
}
</script>

<style scoped>
/* Publications-specific styles */
.dashboard {
  background: white;
  border-radius: 8px;
  padding: 0;
  min-height: 500px;
}

/* Main content area */

.dashboard-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-content h2 {
  color: #333;
  margin: 0;
  font-size: 1.5rem;
}

.dashboard-content p {
  color: #666;
  margin: 0;
}

/* Publication form section */
.publication-form {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.publication-form h3 {
  margin: 0 0 1rem 0;
  color: #495057;
}

.publication-form textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
  margin-bottom: 1rem;
}

/* Platform selection styles */
.platforms h4 {
  margin: 0 0 0.5rem 0;
  color: #495057;
}

.platform-grid {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.platform-grid label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background: white;
}

.platform-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.platform-grid input:checked + .platform-icon + span {
  color: #611555;
  font-weight: bold;
}

/* Schedule section styles */
.schedule-section {
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.schedule-section h4 {
  margin: 0 0 0.5rem 0;
  color: #495057;
}

.schedule-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.schedule-options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.schedule-datetime input {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

/* Publish button styles */
.publish-btn {
  background: #611555;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.publish-btn:hover {
  background: #420e3a;
}

/* Posts list styles */
.posts-list {
  margin-top: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.posts-list h3 {
  margin: 0 0 1rem 0;
  color: #495057;
}

.posts-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-item {
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  background: #f8f9fa;
}

.post-status {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.status-published {
  color: #28a745;
}

.status-scheduled {
  color: #ffc107;
}

.status-draft {
  color: #6c757d;
}

.post-content {
  margin-bottom: 0.5rem;
  color: #495057;
}

.post-date {
  font-size: 0.8rem;
  color: #6c757d;
}
</style>
