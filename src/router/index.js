import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        title: 'Dashboard',
        icon: '📊'
      }
    },
    {
      path: '/publications',
      name: 'Publications',
      component: () => import('../views/PublicationsView.vue'),
      meta: {
        title: 'Publications',
        icon: '📝'
      }
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: () => import('../views/CalendarView.vue'),
      meta: {
        title: 'Calendrier',
        icon: '📅'
      }
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: () => import('../views/AnalyticsView.vue'),
      meta: {
        title: 'Analytics',
        icon: '📈'
      }
    }
  ]
})

// Update page title
router.beforeEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - Social Manager` : 'Social Manager'
})

export default router
