// Onboarding Steps Index
// Centralized imports for all onboarding step files

import dashboardSteps from './dashboard.json'
import publicationsSteps from './publications.json'
import calendarSteps from './calendar.json'
import analyticsSteps from './analytics.json'

export const onboardingSteps = {
  dashboard: dashboardSteps,
  publications: publicationsSteps,
  calendar: calendarSteps,
  analytics: analyticsSteps
}

// Named exports for individual step files
export { dashboardSteps }
export { publicationsSteps }
export { calendarSteps }
export { analyticsSteps }

// Default export
export default onboardingSteps
