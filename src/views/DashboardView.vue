<template>
  <div id="main-dashboard" class="dashboard">
    <!-- Page header with Guide button -->
    <div class="page-header">
      <h2 id="header-title">Dashboard - Social Manager</h2>
      <button @click="showGuide = true" id="guide-button" class="guide-button shiny-button">
        ✨ Guide
      </button>
    </div>

    <div id="dashboard-overview" class="dashboard-content">
      <!-- Overview description -->
      <p>Vue d'ensemble de vos performances sur les réseaux sociaux</p>

      <!-- Key metrics cards -->
      <div id="metrics-grid" class="metrics-grid">
        <div class="metric-card">
          <h3>📝 Publications</h3>
          <div class="metric-value">127</div>
          <small>+12 cette semaine</small>
        </div>
        <div class="metric-card">
          <h3>❤️ Engagement</h3>
          <div class="metric-value">8.4%</div>
          <small>+0.8% ce mois</small>
        </div>
        <div class="metric-card">
          <h3>👥 Followers</h3>
          <div class="metric-value">15.2K</div>
          <small>+340 ce mois</small>
        </div>
      </div>

      <!-- Quick actions section -->
      <div id="quick-actions" class="quick-actions">
        <h3>Actions Rapides</h3>
        <div class="actions-grid">
          <router-link to="/publications" class="action-button">
            📝 Nouvelle Publication
          </router-link>
          <router-link to="/calendar" class="action-button">
            📅 Voir le Calendrier
          </router-link>
          <router-link to="/analytics" class="action-button">
            📈 Analyser les Performances
          </router-link>
        </div>
      </div>
    </div>

    <!-- OnboardingGuide component -->
    <OnboardingGuide v-if="showGuide" :steps="guideSteps" @close="closeGuide" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { dashboardSteps } from '../assets/onboarding'
import OnboardingGuide from '../components/OnboardingGuide.vue'

// Reactive state for onboarding guide
const showGuide = ref(false)
const guideSteps = ref(dashboardSteps)

// Auto-show guide on first visit using localStorage
onMounted(() => {
  const hasSeenDashboardGuide = localStorage.getItem('hasSeenDashboardGuide')
  if (!hasSeenDashboardGuide) {
    showGuide.value = true
  }
})

// Handle guide closure and update localStorage
const closeGuide = () => {
  showGuide.value = false
  localStorage.setItem('hasSeenDashboardGuide', 'true')
}
</script>

<style scoped>
/* Main dashboard container */
.dashboard {
  background: white;
  border-radius: 8px;
  padding: 0;
  min-height: 500px;
}

/* Dashboard content area */
.dashboard-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-content p {
  color: #666;
  margin: 0;
}

/* Metrics grid layout */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

/* Individual metric cards */
.metric-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #e9ecef;
}

.metric-card h3 {
  margin: 0 0 0.5rem 0;
  color: #495057;
  font-size: 1rem;
}

.metric-value {
  font-size: 2rem;
  font-weight: bold;
  color: #611555;
  margin: 0.5rem 0;
}

.metric-card small {
  color: #28a745;
  font-weight: 500;
}

/* Quick actions section */
.quick-actions {
  margin-top: 1rem;
}

.quick-actions h3 {
  margin: 0 0 1rem 0;
  color: #495057;
  font-size: 1.25rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-button {
  background: var(--primary-color);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.2s;
  display: block;
}

.action-button:hover {
  background: var(--button-color);
}
</style>
