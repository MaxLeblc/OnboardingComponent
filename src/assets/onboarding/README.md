# Onboarding Assets Structure

## Organisation

Cette nouvelle structure organise les fichiers JSON d'onboarding de manière plus propre et modulaire :

```
src/assets/onboarding/
├── index.js           # Point d'entrée centralisé pour tous les imports
├── dashboard.json     # Étapes d'onboarding complètes (intro générale + dashboard)
├── publications.json  # Étapes d'onboarding pour les Publications
├── calendar.json      # Étapes d'onboarding pour le Calendrier
└── analytics.json     # Étapes d'onboarding pour les Analytics
```

## Utilisation

### Import recommandés
```javascript
import { dashboardSteps } from '../assets/onboarding'     // Guide complet avec intro
import { publicationsSteps } from '../assets/onboarding'  // Guide Publications
import { calendarSteps } from '../assets/onboarding'      // Guide Calendrier
import { analyticsSteps } from '../assets/onboarding'     // Guide Analytics
```

### Import groupé
```javascript
import { onboardingSteps } from '../assets/onboarding'

// Accès via :
onboardingSteps.dashboard      // Guide complet (intro + dashboard)
onboardingSteps.publications
onboardingSteps.calendar
onboardingSteps.analytics
```

## Fusion General + Dashboard

Le guide général a été intelligemment fusionné avec le guide Dashboard pour créer une expérience d'onboarding fluide :

1. **🚀 Introduction générale** - Accueil et présentation
2. **🧭 Navigation** - Orientation dans l'application  
3. **📊 Dashboard spécifique** - Fonctionnalités du tableau de bord
4. **👤 Profil utilisateur** - Personnalisation
5. **🆘 Aide contextuelle** - Support continu

### Catégorisation des étapes :
- `introduction` - Étapes d'accueil
- `navigation` - Orientation dans l'app
- `dashboard` - Fonctionnalités spécifiques
- `profile` - Gestion du profil
- `help` - Support et aide

## Avantages

1. **Expérience unifiée** : Introduction + spécificités en un seul guide
2. **Flow narratif** : Progression logique de général vers spécifique
3. **Moins de fragmentation** : Un guide complet plutôt que deux séparés
4. **Maintien de la distinction** : Catégorisation pour identifier les types d'étapes
5. **Réutilisabilité** : Possibilité d'extraire les catégories si nécessaire

## Migration

- ✅ **`general.json` supprimé** - Fusionné avec `dashboard.json`
- ✅ **Utilisez `dashboardSteps`** pour le guide complet
- ✅ **Étapes catégorisées** : `"introduction"`, `"navigation"`, `"dashboard"`, `"profile"`, `"help"`
- ✅ **Structure simplifiée** : 4 fichiers au lieu de 5
