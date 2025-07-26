<template>
  <div class="calendar-view">
    <!-- Page header with Guide button -->
    <div class="page-header">
      <h2>Calendrier</h2>
      <button @click="showGuide = true" id="guide-button" class="guide-button shiny-button">
        ✨ Guide
      </button>
    </div>

    <div class="calendar-container">
      <!-- Main calendar component -->
      <div class="calendar-main" id="calendar-view">
        <!-- Calendar navigation -->
        <div class="calendar-header" id="calendar-navigation">
          <button @click="previousMonth" class="nav-btn">‹</button>
          <h3 class="calendar-title">{{ currentMonthLabel }}</h3>
          <button @click="nextMonth" class="nav-btn">›</button>
        </div>

        <!-- Calendar grid -->
        <div class="calendar-grid">
          <!-- Day headers -->
          <div class="calendar-weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
          </div>

          <!-- Month days -->
          <div class="calendar-days">
            <div
              v-for="day in calendarDays"
              :key="day.date"
              :class="[
                'calendar-day',
                {
                  'other-month': !day.isCurrentMonth,
                  today: day.isToday,
                  selected: selectedDate === day.date,
                  'has-posts': day.posts.length > 0,
                },
              ]"
              @click="selectDate(day.date)"
            >
              <div class="day-number">{{ day.dayNumber }}</div>
              <div class="day-posts" id="scheduled-posts">
                <div
                  v-for="post in day.posts.slice(0, 2)"
                  :key="post.id"
                  :class="['post-indicator', `platform-${post.platform}`]"
                  :title="post.content"
                >
                  {{ getPlatformIcon(post.platform) }}
                </div>
                <div v-if="day.posts.length > 2" class="more-posts">
                  +{{ day.posts.length - 2 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Day details sidebar -->
      <div class="day-sidebar" id="day-sidebar">
        <div class="sidebar-header">
          <h3>{{ selectedDateLabel }}</h3>
          <button class="add-post-btn">+ Ajouter</button>
        </div>

        <div class="sidebar-content">
          <div v-if="selectedDayPosts.length === 0" class="no-posts">
            <div class="no-posts-icon">📅</div>
            <p>Aucune publication prévue ce jour</p>
            <button class="btn-primary">Créer une publication</button>
          </div>

          <div v-else class="scheduled-posts-list">
            <div v-for="post in selectedDayPosts" :key="post.id" class="scheduled-post-card">
              <div class="post-card-header">
                <div class="post-platform">
                  <span class="platform-icon">{{ getPlatformIcon(post.platform) }}</span>
                  <span class="platform-name">{{ getPlatformName(post.platform) }}</span>
                </div>
                <div class="post-time">{{ formatTime(post.scheduledTime) }}</div>
              </div>

              <div class="post-card-content">{{ post.content }}</div>

              <div class="post-card-actions">
                <button class="action-btn edit">✏️</button>
                <button class="action-btn stats">📊</button>
                <button class="action-btn delete">🗑️</button>
              </div>
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
import { ref, computed, onMounted } from 'vue'
import OnboardingGuide from '../components/OnboardingGuide.vue'
import { calendarSteps } from '../assets/onboarding'

// Reactive state for onboarding guide
const showGuide = ref(false)
const guideSteps = ref(calendarSteps)

// Calendar state
const currentDate = ref(new Date())
const selectedDate = ref(new Date().toISOString().split('T')[0])

// Week days configuration
const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

// Sample posts data
const scheduledPosts = ref([
  {
    id: 1,
    date: '2025-01-22',
    scheduledTime: '09:00',
    platform: 'instagram',
    content: 'Découvrez les nouvelles tendances du marketing digital ! 🚀',
  },
  {
    id: 2,
    date: '2025-01-22',
    scheduledTime: '14:30',
    platform: 'twitter',
    content: "Thread sur les meilleures pratiques pour augmenter l'engagement...",
  },
  {
    id: 3,
    date: '2025-01-23',
    scheduledTime: '10:15',
    platform: 'linkedin',
    content: "Article sur l'innovation dans l'IA et son impact sur les entreprises",
  },
  {
    id: 4,
    date: '2025-01-25',
    scheduledTime: '16:00',
    platform: 'instagram',
    content: 'Carousel sur les outils indispensables pour les community managers',
  },
  {
    id: 5,
    date: '2025-01-27',
    scheduledTime: '11:00',
    platform: 'twitter',
    content: "Partage d'une infographie sur les statistiques des réseaux sociaux",
  },
])

// Computed properties
const currentMonthLabel = computed(() => {
  return currentDate.value.toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  })
})

const selectedDateLabel = computed(() => {
  const date = new Date(selectedDate.value)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  // First day of the month
  const firstDay = new Date(year, month, 1)

  // First Monday of the grid (may be from previous month)
  const startDate = new Date(firstDay)
  const startDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay() // Monday = 1
  startDate.setDate(startDate.getDate() - (startDayOfWeek - 1))

  const days = []
  const today = new Date().toISOString().split('T')[0]

  // Generate 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    const dateString = date.toISOString().split('T')[0]
    const postsForDay = scheduledPosts.value.filter((post) => post.date === dateString)

    days.push({
      date: dateString,
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
      isToday: dateString === today,
      posts: postsForDay,
    })
  }

  return days
})

const selectedDayPosts = computed(() => {
  return scheduledPosts.value
    .filter((post) => post.date === selectedDate.value)
    .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
})

// Methods
// Navigate to previous month
function previousMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() - 1)
  currentDate.value = newDate
}

// Navigate to next month
function nextMonth() {
  const newDate = new Date(currentDate.value)
  newDate.setMonth(newDate.getMonth() + 1)
  currentDate.value = newDate
}

// Select a specific date and update sidebar
function selectDate(date) {
  selectedDate.value = date
}

// Get platform emoji icon
function getPlatformIcon(platform) {
  const icons = {
    instagram: '📱',
    twitter: '🐦',
    linkedin: '💼',
    facebook: '📘',
    tiktok: '🎵',
  }
  return icons[platform] || '📱'
}

// Get platform display name
function getPlatformName(platform) {
  const names = {
    instagram: 'Instagram',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    tiktok: 'TikTok',
  }
  return names[platform] || platform
}

// Format time for display
function formatTime(time) {
  return time
}

// Show guide automatically on first visit
onMounted(() => {
  const hasSeenCalendarGuide = localStorage.getItem('hasSeenCalendarGuide')
  if (!hasSeenCalendarGuide) {
    showGuide.value = true
  }
})

// Handle guide closure and update localStorage
const closeGuide = () => {
  showGuide.value = false
  localStorage.setItem('hasSeenCalendarGuide', 'true')
}
</script>

<style scoped>
/* Calendar-specific styles */
.calendar-view {
  background: white;
  border-radius: 8px;
  padding: 0;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

/* Calendar container layout */
.calendar-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  flex: 1;
  margin: 2rem;
  min-height: 0;
}

.calendar-main {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

/* Calendar navigation */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.nav-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;
  color: #667eea;
  font-weight: bold;
}

.nav-btn:hover {
  background: rgba(102, 126, 234, 0.1);
}

.calendar-title {
  margin: 0;
  color: #333;
  font-size: 1.25rem;
  text-transform: capitalize;
}

/* Calendar grid layout */
.calendar-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 1px;
}

.weekday {
  padding: 0.75rem;
  text-align: center;
  font-weight: bold;
  background: #f8fafc;
  color: #667eea;
  font-size: 0.9rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #e5e7eb;
  flex: 1;
}

/* Calendar day cells */
.calendar-day {
  background: white;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  min-height: 80px;
}

.calendar-day:hover {
  background: #f0f4ff;
}

.calendar-day.other-month {
  background: #f8fafc;
  opacity: 0.5;
}

.calendar-day.today {
  background: #eff6ff;
  border: 2px solid #667eea;
}

.calendar-day.selected {
  background: #667eea;
  color: white;
}

.calendar-day.has-posts {
  border-left: 3px solid #10b981;
}

.day-number {
  font-weight: bold;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.day-posts {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.post-indicator {
  font-size: 0.7rem;
  padding: 1px 4px;
  border-radius: 2px;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  line-height: 1;
  overflow: hidden;
  white-space: nowrap;
}

.post-indicator.platform-instagram {
  background: rgba(233, 69, 96, 0.1);
  color: #e91e63;
}

.post-indicator.platform-twitter {
  background: rgba(29, 161, 242, 0.1);
  color: #1da1f2;
}

.post-indicator.platform-linkedin {
  background: rgba(0, 119, 181, 0.1);
  color: #0077b5;
}

.more-posts {
  font-size: 0.7rem;
  color: #666;
  font-weight: bold;
}

/* Sidebar styles */
.day-sidebar {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-header h3 {
  margin: 0;
  color: #333;
  font-size: 1rem;
  text-transform: capitalize;
}

.add-post-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.add-post-btn:hover {
  background: #5a67d8;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
}

.no-posts {
  text-align: center;
  padding: 2rem 0;
}

.no-posts-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-posts p {
  color: #666;
  margin-bottom: 1.5rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: translateY(-1px);
}

.scheduled-posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.scheduled-post-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: white;
}

.post-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.post-platform {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.platform-icon {
  font-size: 1.1rem;
}

.platform-name {
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
}

.post-time {
  font-size: 0.9rem;
  color: #667eea;
  font-weight: bold;
}

.post-card-content {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 0.75rem;
}

.post-card-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.action-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #f3f4f6;
}

/* Calendar-specific responsive styles */
@media (max-width: 768px) {
  .calendar-container {
    grid-template-columns: 1fr;
    flex: 1;
    gap: 1rem;
  }

  .day-sidebar {
    order: -1;
    max-height: 300px;
  }

  .calendar-day {
    min-height: 60px;
    padding: 0.25rem;
  }

  .day-number {
    font-size: 0.8rem;
  }

  .post-indicator {
    font-size: 0.6rem;
  }
}
</style>
