<template>
  <div class="app-layout">
    <!-- Header -->
    <header class="app-header">
      <div class="header-content">
        <div class="logo">
          <h1>Social Manager</h1>
          <span class="logo-subtitle">Community Management Platform</span>
        </div>
        
        <nav class="main-nav">
          <router-link 
            v-for="route in navigationRoutes" 
            :key="route.name"
            :to="route.path"
            class="nav-link"
            :class="{ active: $route.name === route.name }"
          >
            <span class="nav-icon">{{ route.meta.icon }}</span>
            <span class="nav-text">{{ route.meta.title }}</span>
          </router-link>
        </nav>

        <div class="header-actions">
          <div class="user-profile">
            <div class="user-avatar">👤</div>
            <span class="user-name">Community Manager</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const navigationRoutes = computed(() => [
  { name: 'Dashboard', path: '/dashboard', meta: { title: 'Dashboard', icon: '📊' } },
  { name: 'Publications', path: '/publications', meta: { title: 'Publications', icon: '📝' } },
  { name: 'Calendar', path: '/calendar', meta: { title: 'Calendrier', icon: '📅' } },
  { name: 'Analytics', path: '/analytics', meta: { title: 'Analytics', icon: '📈' } }
])
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-subtitle {
  font-size: 0.75rem;
  color: #666;
  display: block;
  margin-top: -2px;
}

.main-nav {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: #555;
  transition: all 0.2s ease;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.nav-link.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.nav-icon {
  font-size: 1.2rem;
}

.nav-text {
  font-size: 0.9rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.1);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
}

.user-name {
  font-size: 0.85rem;
  color: #555;
  font-weight: 500;
}

.app-main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .main-nav {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .nav-text {
    display: none;
  }
  
  .app-main {
    padding: 1rem;
  }
}
</style>
