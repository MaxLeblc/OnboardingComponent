# Technical Test - Vue.js Onboarding Component

This project was created as part of the recruitment process for an apprentice developer position.

## Objective

The goal was to create a "Step-by-Step Guide" onboarding component in Vue.js. The component must be configurable via an external file and capable of positioning itself dynamically relative to HTML elements on the page.

## Implemented Features

- **Dynamic Component**: Guide steps are loaded from an `onboarding-steps.json` file, allowing easy modification without touching the source code.
- **Automatic Positioning**: The guide automatically positions itself relative to the HTML element specified by the `targetId` property of each step.
- **Complete Navigation**: Navigation between steps with "Next" and "Previous" buttons.
- **Clean State Management**: Uses Vue 3's Composition API (`ref`, `computed`, `watch`) for clear and performant state management.
- **Flexibility**: If a `targetId` is not found in the DOM, the component centers itself on the page by default to avoid errors.
- **Reusable Component**: The component is self-contained and can be easily integrated into any application view.
- **Smart Positioning**: The component stays within screen boundaries and adapts its position to avoid going off-screen.
- **Attractive Animations**: Shiny button effect to draw user attention to the help guide.
- **Professional Design**: Modern interface with smooth transitions and responsive layout.

## Technologies Used

- **Vue.js 3** (with Composition API)
- **Vite** as build tool
- **JavaScript (ES6+)**
- **HTML5 & CSS3**
- **CSS Grid** for layout management

## Installation and Launch

1. Clone the repository (or unzip the archive).
2. Open a terminal at the project root.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the indicated address.

## Project Structure

```
src/
├── components/
│   └── OnboardingGuide.vue     # Main guide component
├── assets/
│   ├── onboarding-steps.json   # Steps configuration file
│   ├── base.css               # Base styles
│   └── main.css               # Main styles
└── App.vue                    # Integration example
```

## Code Architecture

- **OnboardingGuide.vue**: The main guide component with smart positioning logic
- **onboarding-steps.json**: Configuration file for steps (easily editable)
- **App.vue**: Integration example with professional layout
- **Centralized configuration**: CSS variables for easy theme customization

## Usage

1. Click the "Launch Help Guide" button in the sidebar
2. Follow the step-by-step instructions
3. Use "Previous" and "Next" buttons to navigate
4. The guide automatically positions itself relative to targeted elements

## Configuration

To modify the guide steps, edit the `src/assets/onboarding-steps.json` file:

```json
{
  "targetId": "element-id",
  "title": "Step Title",
  "description": "Step description with <strong>bold text</strong> support",
  "imageUrl": "https://image-url.com/image.png",
  "actiontext": "Button Text"
}
```

## Features Highlights

- ✅ **Responsive Design**: Adapts to different screen sizes
- ✅ **Smart Positioning**: Never goes off-screen
- ✅ **HTML Support**: Rich text in descriptions
- ✅ **Smooth Animations**: Professional user experience
- ✅ **Easy Configuration**: JSON-based setup
- ✅ **Clean Code**: Well-structured and maintainable
- ✅ **Modern Stack**: Vue 3 + Vite + ES6+
