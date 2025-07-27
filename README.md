# Social Manager - Vue.js Application with Onboarding System

![Vercel](https://vercelbadge.vercel.app/api/MaxLeblc/OnboardingComponent)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-4.x-42b883?logo=vue.js&logoColor=white)](https://router.vuejs.org/)

This project demonstrates a complete **Social Media Management Application** with an advanced **step-by-step onboarding system** built with Vue.js 3.

## 🌟 Live Demo

**[View the live demo on Vercel](https://onboarding-component-2m1w1yvje-maxlebdevs-projects.vercel.app)**

## 📋 Application Overview

**Social Manager** is a comprehensive social media management platform featuring:

### 🏠 Dashboard View

- **Performance Metrics**: Real-time statistics for publications, engagement, followers, and impressions
- **Quick Actions**: Direct access to create publications, view calendar, and analyze performance
- **Overview Cards**: Visual representation of key performance indicators

### 📝 Publications View

- **Content Editor**: Rich text editor for creating social media posts
- **Platform Selection**: Multi-platform publishing (Instagram, Facebook, Twitter, LinkedIn, TikTok, YouTube)
- **Scheduling System**: Plan publications with date/time picker
- **Posts Management**: View and manage published, scheduled, and draft posts

### 📅 Calendar View

- **Monthly Calendar**: Visual timeline of all scheduled publications
- **Interactive Navigation**: Browse between months and years
- **Day Details**: Sidebar showing detailed information for selected days
- **Post Indicators**: Visual markers for days with scheduled content

### 📈 Analytics View

- **Performance Charts**: Visual analytics and trending data
- **Platform Breakdown**: Detailed statistics per social media platform
- **AI Recommendations**: Intelligent insights and suggestions for content optimization

## 🎯 Onboarding System Features

### Advanced Step-by-Step Guide

- **View-Specific Guides**: Customized onboarding for each application section
- **Dynamic Positioning**: Automatically positions relative to target elements
- **Smart Scrolling**: Intelligently scrolls to elements within containers or main window
- **Persistent State**: Remembers completed guides using localStorage
- **Responsive Design**: Adapts to different screen sizes and orientations

### Configuration System

- **JSON-Based Configuration**: Easy to modify guide steps without code changes
- **Modular Structure**: Separate configuration files for each view
- **Rich Content Support**: Images, HTML formatting, and custom styling
- **Flexible Targeting**: Target any element by ID with fallback positioning

## 🛠 Technologies Used

- **Vue.js 3** (with Composition API and `<script setup>`)
- **Vue Router 4** for navigation between views
- **Vite** as build tool and development server
- **JavaScript (ES6+)** with modern syntax
- **HTML5 & CSS3** with custom properties (CSS variables)
- **CSS Grid & Flexbox** for responsive layouts
- **LocalStorage API** for persistence

## 🚀 Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MaxLeblc/OnboardingComponent.git
   cd OnboardingComponent
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:

   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── views/                       # Application views
│   ├── DashboardView.vue       # Dashboard with metrics and quick actions
│   ├── PublicationsView.vue    # Content creation and management
│   ├── CalendarView.vue        # Schedule visualization
│   └── AnalyticsView.vue       # Performance analytics
├── components/
│   ├── OnboardingGuide.vue     # Main onboarding component
│   ├── HelloWorld.vue          # Demo component
│   ├── TheWelcome.vue          # Welcome section
│   └── WelcomeItem.vue         # Welcome item component
├── assets/
│   ├── onboarding/             # Onboarding configuration
│   │   ├── index.js           # Main onboarding exports
│   │   ├── dashboard.json     # Dashboard guide steps
│   │   ├── publications.json  # Publications guide steps
│   │   ├── calendar.json      # Calendar guide steps
│   │   └── analytics.json     # Analytics guide steps
│   ├── shared.css             # Shared styles across views
│   ├── base.css               # Base CSS reset and variables
│   ├── main.css               # Main application styles
│   └── logo.svg               # Application logo
├── router/
│   └── index.js               # Vue Router configuration
├── App.vue                    # Main application layout
└── main.js                    # Application entry point
```

## 🏗 Architecture Highlights

### Component Design

- **Reusable OnboardingGuide**: Single component used across all views
- **View-Specific Configuration**: Each view has its own onboarding steps
- **Scoped Styling**: Component styles are scoped to prevent conflicts
- **Shared CSS**: Common styles centralized in `shared.css`

### State Management

- **Composition API**: Modern Vue 3 reactivity system
- **Local State**: Each view manages its own onboarding state
- **Persistent Storage**: localStorage for completed guide tracking
- **Reactive Updates**: Real-time position calculations and updates

### Navigation System

- **Vue Router**: Seamless navigation between application sections
- **Active Link Styling**: Visual feedback for current page
- **Responsive Layout**: Mobile-friendly navigation design

## 🎮 Usage Guide

### Getting Started

1. **Navigate** through the application using the sidebar menu
2. **Click the ✨ Guide button** in any view to start the onboarding
3. **Follow the interactive steps** as they highlight relevant interface elements
4. **Complete each guide** to unlock full functionality of each section

### Onboarding Features

- **Auto-launch**: Guides automatically appear on first visit to each view
- **Manual Access**: Click the Guide button anytime to restart onboarding
- **Progress Tracking**: Completed guides are remembered via localStorage
- **Skip & Resume**: Navigate freely between steps or exit anytime

## ⚙️ Configuration

### Adding New Onboarding Steps

Each view has its own configuration file in `src/assets/onboarding/`:

```json
[
  {
    "targetId": "element-id",
    "title": "Step Title",
    "description": "Detailed description with HTML support",
    "imageUrl": "https://icon-url.com/icon.png",
    "actiontext": "Button Text",
    "category": "section-name"
  }
]
```

### Customizing Styles

The application uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #611555; /* Main brand color */
  --button-color: #7f2171; /* Interactive elements */
  --text-dark: #333; /* Primary text */
  --background-light: #f5f5f5; /* Light backgrounds */
  /* ... more variables */
}
```

## ✨ Key Features

### 🎯 Onboarding System

- ✅ **Context-Aware Guides**: Different onboarding for each application section
- ✅ **Smart Positioning**: Never goes off-screen, adapts to small elements
- ✅ **Scroll Integration**: Automatically scrolls to target elements
- ✅ **Persistent State**: Remembers completion status across sessions
- ✅ **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🎨 User Interface

- ✅ **Modern Design**: Clean, professional interface with smooth animations
- ✅ **Consistent Styling**: Shared design system across all views
- ✅ **Interactive Elements**: Hover effects, transitions, and visual feedback
- ✅ **Accessibility**: Semantic HTML and keyboard navigation support

### 🔧 Technical Excellence

- ✅ **Vue 3 Composition API**: Modern, maintainable code structure
- ✅ **Performance Optimized**: Fast loading and smooth interactions
- ✅ **Error Handling**: Graceful fallbacks for missing elements
- ✅ **Code Quality**: Clean, documented, and well-structured codebase

### 📱 Cross-Platform

- ✅ **Mobile Responsive**: Optimized for all screen sizes
- ✅ **Browser Compatible**: Works in all modern browsers
- ✅ **Touch Friendly**: Mobile-optimized interactions
- ✅ **Fast Loading**: Optimized assets and efficient rendering

## 🚀 Deployment

This project is deployed on **Vercel** with automatic deployment from the GitHub repository:

- **Live URL**: [https://onboarding-component-2m1w1yvje-maxlebdevs-projects.vercel.app](https://onboarding-component-2m1w1yvje-maxlebdevs-projects.vercel.app)
- **GitHub Repository**: [https://github.com/MaxLeblc/OnboardingComponent](https://github.com/MaxLeblc/OnboardingComponent)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vue.js 3 with Vite

### Deployment Features

- 🔄 **Automatic Deployment**: Every push to the main branch triggers a new deployment
- ⚡ **Fast Build**: Optimized Vite build process (~15 seconds)
- 🌍 **Global CDN**: Fast loading worldwide
- 📱 **Mobile Optimized**: Responsive design tested on all devices
- ✅ **Easy Configuration**: JSON-based setup
- ✅ **Clean Code**: Well-structured and maintainable
- ✅ **Modern Stack**: Vue 3 + Vite + ES6+

## 🧪 Development & Testing

### Development Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint

# Run unit tests (if configured)
npm run test
```

### Development Features

- **Hot Module Replacement**: Instant updates during development
- **ESLint Integration**: Code quality and consistency checks
- **Vue DevTools**: Enhanced debugging in development
- **Source Maps**: Easy debugging with original source files

## 🔧 Code Quality & Standards

- **Vue 3 Composition API**: Modern, performant Vue.js patterns
- **ESLint Configuration**: Consistent code style and best practices
- **Semantic HTML**: Accessible and SEO-friendly markup
- **CSS Custom Properties**: Maintainable and themeable styles
- **Modular Architecture**: Reusable and scalable component structure
- **English Comments**: Clear, professional code documentation

## 📈 Performance Optimizations

- **Vite Build Optimization**: Fast builds with efficient bundling
- **Dynamic Imports**: Code splitting for optimal loading
- **CSS Optimization**: Scoped styles and shared stylesheets
- **Image Optimization**: Proper loading strategies
- **LocalStorage Caching**: Persistent user preferences

## 🎯 Future Enhancements

Potential improvements for the onboarding system:

- **Multi-language Support**: i18n integration for global audiences
- **Analytics Integration**: Track onboarding completion rates
- **Advanced Animations**: More sophisticated transitions and effects
- **Theming System**: Multiple color schemes and customization options
- **A/B Testing**: Test different onboarding flows
- **Progress Indicators**: Visual progress bars for longer guides

---

**Built with ❤️ using Vue.js 3 and modern web technologies**
