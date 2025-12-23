# 🚀 Crypto Exchange Dashboard

Un dashboard moderne et responsive pour suivre les cryptomonnaies en temps réel, inspiré des meilleures plateformes d'échange.

## 📋 Table des matières

- [À propos](#-à-propos)
- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Roadmap du projet](#-roadmap-du-projet)
- [Installation](#-installation)
- [Structure du projet](#-structure-du-projet)
- [Scripts disponibles](#-scripts-disponibles)

## 🎯 À propos

Ce projet est un dashboard crypto full-stack développé pour démontrer mes compétences en développement web moderne. L'objectif est de créer une interface intuitive et performante permettant de suivre les marchés crypto, gérer un portefeuille et analyser les tendances.

**Design inspiré de :** [Dribbble - Crypto Exchange Dashboard](https://dribbble.com/shots/25337583-Crypto-Exchange-dashboard)

## ✨ Fonctionnalités

### Actuellement implémentées
- ✅ Interface moderne avec dark/light mode
- ✅ Toggle theme avec animation smooth
- ✅ Architecture composants réutilisables
- ✅ Gestion d'état avec Context API (Theme, Auth)
- ✅ TypeScript pour la type safety

### En développement
- 🚧 Design responsive
- 🚧 Affichage des prix crypto en temps réel
- 🚧 Graphiques interactifs (Recharts)
- 🚧 Sidebar de navigation
- 🚧 Header avec informations utilisateur
- 🚧 Tableau des marchés avec tri/filtrage

### À venir
- 📋 Backend Python (FastAPI)
- 📋 Authentification utilisateur
- 📋 Gestion de portefeuille
- 📋 Alertes de prix
- 📋 Historique des transactions
- 📋 WebSocket pour les données temps réel

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icônes
- **Context API** - State management

### Backend (à venir)
- **Python 3.11+**
- **FastAPI** - Framework API REST
- **SQLAlchemy** - ORM
- **PostgreSQL** - Base de données
- **Redis** - Cache
- **WebSocket** - Données temps réel

### DevOps (à venir)
- **Docker** - Containerisation
- **Docker Compose** - Orchestration
- **GitHub Actions** - CI/CD
- **Vitest** - Tests unitaires

## 📅 Roadmap du projet

### Phase 1 : Frontend Foundation ✅ (Actuelle)
- [x] Setup du projet (Vite + React + TypeScript)
- [x] Configuration Tailwind CSS
- [x] Context pour le theme (Dark/Light mode)
- [x] Composants réutilisables (Button, etc.)
- [x] Layout principal (Sidebar + Header)
- [ ] Context pour l'authentification
- [ ] Pages de base (Dashboard, Markets, Portfolio)

### Phase 2 : Intégration API
- [ ] Appels aux APIs publiques (CoinGecko, Binance)
- [ ] Affichage des prix crypto
- [ ] Graphiques avec Recharts
- [ ] Gestion du cache avec React Query
- [ ] Gestion d'erreurs et loading states

### Phase 3 : Backend Python
- [ ] Setup FastAPI
- [ ] Modèles de données (SQLAlchemy)
- [ ] Endpoints API REST
- [ ] Authentification JWT
- [ ] WebSocket pour temps réel
- [ ] Intégration Redis pour cache

### Phase 4 : Features Avancées
- [ ] Système d'alertes de prix
- [ ] Gestion de portefeuille personnel
- [ ] Historique et statistiques
- [ ] Export de données
- [ ] Notifications push

### Phase 5 : Tests & DevOps
- [ ] Tests unitaires (Vitest)
- [ ] Tests d'intégration
- [ ] Docker & Docker Compose
- [ ] CI/CD avec GitHub Actions
- [ ] Déploiement (Vercel + Railway/Render)

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes

1. **Cloner le repository**

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── Button.tsx
│   │   ├── Layout.tsx
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   ├── contexts/          # Context API (state global)
│   │   ├── ThemeContext.tsx
│   ├── pages/             # Pages de l'application
│   │   ├── Dashboard.tsx
│   │   ├── Markets.tsx
│   │   └── Portfolio.tsx
│   ├── hooks/             # Custom hooks
│   ├── utils/             # Fonctions utilitaires
│   ├── types/             # Types TypeScript
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 📜 Scripts disponibles

```bash
# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Preview du build de production
npm run preview

# Linter (à venir)
npm run lint

# Tests (à venir)
npm run test
```


### Modifier le thème par défaut

Dans `ThemeContext.tsx`, changez la valeur initiale :

```typescript
const [theme, setTheme] = useState<Theme>('dark') // ou 'light'
```


## 👤 Auteur

**Votre Nom**
- LinkedIn : https://www.linkedin.com/in/thomas-alzonne-a42850173/
- GitHub : thomasalzonne

---

⭐ N'hésitez pas à star le projet si vous le trouvez intéressant !