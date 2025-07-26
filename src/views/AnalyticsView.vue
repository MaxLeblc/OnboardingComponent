<template>
  <div class="analytics-view">
    <!-- Page header with Guide button -->
    <div class="page-header" id="analytics-overview">
      <h2>Analytics</h2>
      <button @click="showGuide = true" id="guide-button" class="guide-button shiny-button">
        ✨ Guide
      </button>
    </div>

    <!-- General metrics overview -->
    <div class="analytics-summary">
      <div class="summary-card">
        <h3>Performance Globale</h3>
        <div class="summary-stats">
          <div class="stat-item">
            <div class="stat-value">4.2M</div>
            <div class="stat-label">Impressions totales</div>
            <div class="stat-change positive">+15% vs mois dernier</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">89.3K</div>
            <div class="stat-label">Engagement total</div>
            <div class="stat-change positive">+8% vs mois dernier</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">7.8%</div>
            <div class="stat-label">Taux d'engagement</div>
            <div class="stat-change positive">+0.5% vs mois dernier</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance charts section -->
    <div class="performance-charts" id="performance-charts">
      <div class="chart-container">
        <div class="chart-card">
          <div class="chart-header">
            <h3>Évolution de l'engagement</h3>
            <div class="chart-controls">
              <button
                v-for="period in timePeriods"
                :key="period.value"
                :class="['period-btn', { active: selectedPeriod === period.value }]"
                @click="selectedPeriod = period.value"
              >
                {{ period.label }}
              </button>
            </div>
          </div>
          <div class="chart-content">
            <div class="chart-placeholder">
              📈 Graphique d'engagement ({{ selectedPeriod }})
              <div class="chart-legend">
                <div class="legend-item">
                  <div class="legend-color" style="background: #667eea"></div>
                  <span>Likes</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #764ba2"></div>
                  <span>Commentaires</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color" style="background: #f093fb"></div>
                  <span>Partages</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <h3>Reach par jour</h3>
          <div class="chart-placeholder small">📊 Graphique du reach quotidien</div>
        </div>
      </div>
    </div>

    <!-- Platform breakdown analysis -->
    <div class="platform-analytics" id="platform-breakdown">
      <h3>Performance par Plateforme</h3>
      <div class="platforms-grid">
        <div v-for="platform in platformStats" :key="platform.name" class="platform-card">
          <div class="platform-header">
            <img :src="platform.icon" :alt="platform.name" class="platform-icon" />
            <h4>{{ platform.name }}</h4>
          </div>

          <div class="platform-metrics">
            <div class="metric">
              <div class="metric-value">{{ platform.followers }}</div>
              <div class="metric-label">Followers</div>
            </div>
            <div class="metric">
              <div class="metric-value">{{ platform.engagement }}</div>
              <div class="metric-label">Engagement</div>
            </div>
            <div class="metric">
              <div class="metric-value">{{ platform.reach }}</div>
              <div class="metric-label">Reach</div>
            </div>
          </div>

          <div class="platform-chart">
            <div class="mini-chart">{{ platform.trendIcon }} {{ platform.trend }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top performing publications -->
    <div class="top-posts" id="top-posts">
      <h3>Publications les plus performantes</h3>
      <div class="posts-grid">
        <div v-for="post in topPosts" :key="post.id" class="top-post-card">
          <div class="post-platform">
            <img
              :src="getPlatformIcon(post.platform)"
              :alt="post.platform"
              class="post-platform-icon"
            />
            <span class="platform-name">{{ post.platform }}</span>
            <span class="post-date">{{ formatDate(post.date) }}</span>
          </div>

          <div class="post-content">{{ post.content }}</div>

          <div class="post-metrics">
            <div class="post-metric">
              <span class="metric-icon">❤️</span>
              <span>{{ post.likes }}</span>
            </div>
            <div class="post-metric">
              <span class="metric-icon">💬</span>
              <span>{{ post.comments }}</span>
            </div>
            <div class="post-metric">
              <span class="metric-icon">🔄</span>
              <span>{{ post.shares }}</span>
            </div>
            <div class="post-metric">
              <span class="metric-icon">👁️</span>
              <span>{{ post.reach }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI recommendations section -->
    <div class="ai-recommendations" id="ai-insights">
      <h3>🤖 Recommandations IA</h3>
      <div class="insights-grid">
        <div
          v-for="insight in aiInsights"
          :key="insight.id"
          class="insight-card"
          :class="insight.priority"
        >
          <div class="insight-icon">{{ insight.icon }}</div>
          <div class="insight-content">
            <h4>{{ insight.title }}</h4>
            <p>{{ insight.description }}</p>
            <div class="insight-actions">
              <span class="priority-badge" :class="insight.priority">{{
                insight.priorityLabel
              }}</span>
              <button class="action-btn">{{ insight.actionLabel }}</button>
            </div>
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
import { analyticsSteps } from '../assets/onboarding'
import OnboardingGuide from '../components/OnboardingGuide.vue'

// Reactive state for onboarding guide
const showGuide = ref(false)
const guideSteps = ref(analyticsSteps)

// Analytics state
const selectedPeriod = ref('7d')

// Time periods
const timePeriods = ref([
  { value: '7d', label: '7j' },
  { value: '30d', label: '30j' },
  { value: '90d', label: '3m' },
  { value: '1y', label: '1an' },
])

// Platform statistics data
const platformStats = ref([
  {
    name: 'Instagram',
    icon: 'https://cdn-icons-png.flaticon.com/128/4138/4138124.png',
    followers: '12.4K',
    engagement: '8.7%',
    reach: '45.2K',
    trend: '+12%',
    trendIcon: '📈',
  },
  {
    name: 'TikTok',
    icon: 'https://cdn-icons-png.flaticon.com/128/4138/4138151.png',
    followers: '8.9K',
    engagement: '5.3%',
    reach: '28.7K',
    trend: '+8%',
    trendIcon: '📈',
  },
  {
    name: 'LinkedIn',
    icon: 'https://cdn-icons-png.flaticon.com/128/4138/4138130.png',
    followers: '3.2K',
    engagement: '12.1%',
    reach: '15.8K',
    trend: '+15%',
    trendIcon: '📈',
  },
  {
    name: 'Facebook',
    icon: 'https://cdn-icons-png.flaticon.com/128/4138/4138125.png',
    followers: '6.7K',
    engagement: '3.9%',
    reach: '22.1K',
    trend: '-2%',
    trendIcon: '📉',
  },
])

// Top performing posts data
const topPosts = ref([
  {
    id: 1,
    platform: 'Instagram',
    content: 'Les 5 tendances marketing digital à suivre en 2025 🚀',
    date: '2025-01-18',
    likes: 1247,
    comments: 89,
    shares: 156,
    reach: '12.8K',
  },
  {
    id: 2,
    platform: 'LinkedIn',
    content: "Comment l'IA transforme le marketing de contenu - Thread complet",
    date: '2025-01-16',
    likes: 892,
    comments: 67,
    shares: 234,
    reach: '18.2K',
  },
  {
    id: 3,
    platform: 'TikTok',
    content: 'Thread : Les erreurs à éviter en community management',
    date: '2025-01-15',
    likes: 567,
    comments: 45,
    shares: 178,
    reach: '9.4K',
  },
])

// AI insights and recommendations
const aiInsights = ref([
  {
    id: 1,
    icon: '⏰',
    title: 'Optimal posting time',
    description:
      'Vos publications sur Instagram performent 23% mieux entre 19h et 21h. Programmez plus de contenu à ces heures.',
    priority: 'high',
    priorityLabel: 'Priorité haute',
    actionLabel: 'Programmer maintenant',
  },
  {
    id: 2,
    icon: '📝',
    title: 'Content strategy',
    description:
      "Les posts avec des questions génèrent 45% plus de commentaires. Intégrez plus d'interactions dans vos publications.",
    priority: 'medium',
    priorityLabel: 'Priorité moyenne',
    actionLabel: 'Créer un post',
  },
  {
    id: 3,
    icon: '🎯',
    title: 'Audience targeting',
    description:
      'Votre audience est plus active le mardi et jeudi. Augmentez la fréquence de publication ces jours-là.',
    priority: 'low',
    priorityLabel: 'Priorité basse',
    actionLabel: 'Ajuster le planning',
  },
])

// Methods
// Get platform icon URL from Flaticon
function getPlatformIcon(platform) {
  const icons = {
    Instagram: 'https://cdn-icons-png.flaticon.com/128/4138/4138124.png',
    TikTok: 'https://cdn-icons-png.flaticon.com/128/4138/4138151.png',
    LinkedIn: 'https://cdn-icons-png.flaticon.com/128/4138/4138130.png',
    Facebook: 'https://cdn-icons-png.flaticon.com/128/4138/4138125.png',
  }
  return icons[platform] || 'https://cdn-icons-png.flaticon.com/128/4138/4138124.png'
}

// Format date for display in French locale
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
  })
}

// Show guide automatically on first visit
onMounted(() => {
  const hasSeenAnalyticsGuide = localStorage.getItem('hasSeenAnalyticsGuide')
  if (!hasSeenAnalyticsGuide) {
    showGuide.value = true
  }
})

// Handle guide closure and update localStorage
const closeGuide = () => {
  showGuide.value = false
  localStorage.setItem('hasSeenAnalyticsGuide', 'true')
}
</script>

<style scoped>
/* Analytics-specific styles */
.analytics-view {
  background: white;
  border-radius: 8px;
  padding: 0;
  min-height: 500px;
}

/* Analytics summary section */
.analytics-summary {
  margin: 2rem;
  margin-bottom: 2rem;
}

.summary-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.summary-card h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.25rem;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.25rem;
}

.stat-change {
  font-size: 0.9rem;
  font-weight: bold;
}

.stat-change.positive {
  color: #10b981;
}

/* Performance charts section */
.performance-charts {
  margin: 0 2rem 2rem 2rem;
}

.chart-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

.chart-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chart-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

.chart-controls {
  display: flex;
  gap: 0.5rem;
}

.period-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.period-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.chart-content {
  position: relative;
}

.chart-placeholder {
  height: 250px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1rem;
}

.chart-placeholder.small {
  height: 150px;
}

.chart-legend {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.platform-analytics {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin: 0 2rem 2rem 2rem;
}

.platform-analytics h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.25rem;
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.platform-card {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.platform-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.platform-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.platform-header h4 {
  margin: 0;
  color: #333;
  flex: 1;
}

.platform-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric {
  text-align: center;
}

.metric-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.metric-label {
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.platform-chart {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.mini-chart {
  font-size: 0.9rem;
  font-weight: bold;
  color: #10b981;
}

.top-posts {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
}

.top-posts h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.25rem;
}

.posts-grid {
  display: grid;
  gap: 1.5rem;
}

.top-post-card {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.post-platform {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.post-platform-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.platform-name {
  font-weight: bold;
  color: #333;
}

.post-date {
  color: #666;
  margin-left: auto;
}

.post-content {
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.post-metrics {
  display: flex;
  gap: 1.5rem;
}

.post-metric {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: #666;
}

.metric-icon {
  font-size: 1rem;
}

/* AI recommendations section */
.ai-recommendations {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin: 0 2rem 2rem 2rem;
}

.ai-recommendations h3 {
  margin: 0 0 1.5rem 0;
  color: #333;
  font-size: 1.25rem;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.insight-card {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  display: flex;
  gap: 1rem;
}

.insight-card.high {
  border-left: 4px solid #dc2626;
}

.insight-card.medium {
  border-left: 4px solid #d97706;
}

.insight-card.low {
  border-left: 4px solid #0369a1;
}

.insight-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.insight-content {
  flex: 1;
}

.insight-content h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1rem;
}

.insight-content p {
  color: #555;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.insight-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.priority-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.priority-badge.high {
  background: #fef2f2;
  color: #dc2626;
}

.priority-badge.medium {
  background: #fef3c7;
  color: #d97706;
}

.priority-badge.low {
  background: #f0f9ff;
  color: #0369a1;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  background: #667eea;
  color: white;
}

.action-btn:hover {
  background: #5a67d8;
}

/* Analytics-specific responsive styles */
@media (max-width: 768px) {
  .chart-container {
    grid-template-columns: 1fr;
  }

  .summary-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .platforms-grid,
  .insights-grid {
    grid-template-columns: 1fr;
  }

  .post-metrics {
    flex-wrap: wrap;
    gap: 1rem;
  }

  .chart-controls {
    flex-wrap: wrap;
  }
}
</style>
