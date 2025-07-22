<script setup>
import { ref } from 'vue'
import stepsData from './assets/onboarding-steps.json'
import OnboardingGuide from './components/OnboardingGuide.vue'

// Reactive state to control the visibility of the onboarding guide.
const showGuide = ref(false)

// Function to start the onboarding process.
function startOnboarding() {
  showGuide.value = true
  console.log('Onboarding guide started')
}
</script>

<template>
  <div id="app-layout">
    <header>
      <img
        src="https://cdn.prod.website-files.com/65ba50169b2581e889a000ba/65bb79b843b4aeb5243b764b_mashup-web-social-logo.svg"
        alt="Logo"
        width="100 "
        loading="lazy"
      />
      <div id="user-profile">
        <img src="https://i.pravatar.cc/50" alt="User avatar" class="avatar" />
        <span>John Doe</span>
      </div>
    </header>

    <aside>
      <nav id="sidebar-navigation" class="sidebar-nav">
        <a href="#">Overview</a>
        <a href="#">Pages</a>
        <a href="#">Content</a>
        <div class="actions">
          <button @click="startOnboarding" id="action-button" class="start-btn">
            Lancer le guide d'aide
          </button>
        </div>
      </nav>
    </aside>

    <main>
      <div id="main-dashboard" class="dashboard">
        <p>(Contenu principal du tableau de bord)</p>
      </div>
    </main>

    <OnboardingGuide v-if="showGuide" :steps="stepsData" @close="showGuide = false" />
  </div>
</template>

<style>
:root {
  --sidebar-width: 240px;
  --header-height: 65px;
  --primary-color: #611555;
  --button-color: #7f2171;
  --button-glow-color: rgba(152, 40, 167, 0.5);
  --button-glow-intense: rgba(152, 40, 167, 0.8);
  --text-light: #ddd;
  --text-dark: #333;
  --background-light: #f5f5f5;
  --background-gray: #ddd;
  --border-color: #ddd;
  --white: white;
}

body {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 100vh !important;
}

#app {
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Layout Grid */
#app-layout {
  display: grid;
  grid-template-areas:
    'header header'
    'sidebar main';
  grid-template-columns: var(--sidebar-width) 1fr;
  grid-template-rows: var(--header-height) 1fr;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: var(--background-gray);
}

/* Header */
header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--primary-color);
  border-bottom: 1px solid var(--border-color);
  z-index: 100;
}

/* Sidebar */
aside {
  grid-area: sidebar;
  background: var(--white);
  border-right: 1px solid var(--border-color);
  padding: 1rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-nav a {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--text-dark);
  border-radius: 4px;
  transition: background-color 0.2s;
}

.sidebar-nav a:hover {
  background-color: var(--background-light);
}

.sidebar-nav a.active {
  background-color: var(--primary-color);
  color: var(--white);
}

#user-profile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 1.2rem;
}

.avatar {
  border-radius: 50%;
}

main {
  grid-area: main;
  padding: 2rem;
  overflow-y: auto;
}

.dashboard {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--white);
  border-radius: 8px;
  height: 100%;
  min-height: 200px;
  color: var(--text-dark);
}
.actions {
  margin-bottom: 1rem;
}
.start-btn {
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  background-color: var(--button-color);
  color: var(--white);
  border: none;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  animation: shiny-effect 2s ease-in-out 2;
}

.start-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: shine 2s ease-in-out 2;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes shiny-effect {
  0%,
  100% {
    box-shadow: 0 0 5px var(--button-glow-color);
  }
  50% {
    box-shadow:
      0 0 20px var(--button-glow-intense),
      0 0 30px var(--button-glow-color);
  }
}
</style>
