<script setup>
// App.vue is now just a layout container
// Individual guides are handled by each view
</script>

<template>
  <div id="app-layout">
    <header>
      <img
        src="https://cdn.prod.website-files.com/65ba50169b2581e889a000ba/65bb79b843b4aeb5243b764b_mashup-web-social-logo.svg"
        alt="Logo"
        width="100"
        loading="lazy"
      />
      <div id="user-profile">
        <img src="https://i.pravatar.cc/50" alt="User avatar" class="avatar" />
        <span>John Doe</span>
      </div>
    </header>

    <aside>
      <nav id="sidebar-navigation" class="sidebar-nav">
        <router-link to="/dashboard">📊 Dashboard</router-link>
        <router-link to="/publications">📝 Publications</router-link>
        <router-link to="/calendar">📅 Calendrier</router-link>
        <router-link to="/analytics">📈 Analytics</router-link>
      </nav>
    </aside>

    <main>
      <router-view />
    </main>
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0 !important;
  padding: 0 !important;
  min-height: 100vh !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

.sidebar-nav a.router-link-active {
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
  background: var(--background-gray);
}

/* Responsive */
@media (max-width: 768px) {
  #app-layout {
    grid-template-areas:
      'header'
      'main';
    grid-template-columns: 1fr;
    grid-template-rows: var(--header-height) 1fr;
  }
  
  aside {
    display: none;
  }
}
</style>
