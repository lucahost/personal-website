# 🚀 Personal Website - Luca Hostettler

[![Build and Deploy](https://github.com/lucahost/personal-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/lucahost/personal-website/actions/workflows/deploy.yml)
[![CI](https://github.com/lucahost/personal-website/actions/workflows/ci.yml/badge.svg)](https://github.com/lucahost/personal-website/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.1-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

Modern, responsive personal portfolio website. Features a sleek design, interactive components, and comprehensive project showcase.

**🌐 Live Website:** [hostettler.io](https://hostettler.io)

## ✨ Features

- **🎨 Modern UI/UX**: Material-UI v7 with custom theming and animations
- **📱 Fully Responsive**: Optimized for all devices from mobile to desktop
- **⚡ High Performance**: Lazy loading, code splitting, and optimized bundle size
- **🎮 Easter Egg**: Hidden terminal with Rick Roll surprise
- **🔍 Project Filtering**: Advanced filtering and search capabilities
- **♿ Accessible**: ARIA labels, keyboard navigation, and touch-friendly interactions
- **🌙 Dark Theme**: Beautiful dark mode design
- **📈 Analytics Ready**: Structured for easy integration with tracking tools

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.9** - Full type safety and developer experience
- **Vite 7.1.3** - Lightning-fast build tool and dev server

### **UI & Styling**

- **Material-UI v7.3.1** - Modern React component library
- **Styled Components** - CSS-in-JS styling solution
- **Material Icons** - Comprehensive icon library
- **Custom Animations** - Smooth transitions and hover effects

### **Development Tools**

- **ESLint 9** - Advanced code linting and quality checks
- **TypeScript ESLint** - Type-aware linting rules
- **React Hooks ESLint** - React-specific linting
- **Browserslist** - Cross-browser compatibility

### **Build & Deployment**

- **GitHub Actions** - Continuous Integration/Deployment
- **Security Auditing** - Automated vulnerability scanning
- **DigitalOcean Droplet** - Production hosting
- **SSH Deployment** - Secure rsync file transfer
- **Artifact Management** - Build artifact storage and caching

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/lucahost/personal-website.git
cd personal-website

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development server with hot reload
npm start

# Build for production
npm run build

# Run ESLint code quality checks
npm run lint

# Preview production build locally
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── home/            # Homepage components
│   ├── project/         # Project showcase components
│   ├── ui/              # Reusable UI components
│   └── ErrorBoundary.tsx
├── hooks/               # Custom React hooks
│   ├── useProjects.ts
│   ├── useLocalStorage.ts
│   └── useHover.ts
├── types/               # TypeScript type definitions
│   ├── project.ts
│   └── index.ts
├── constants/           # App constants and data
│   └── projects.ts
├── common/             # Shared assets and utilities
│   └── img/
├── theme.ts            # Material-UI theme configuration
└── App.tsx             # Root application component
```

---

**Built with ❤️ by [Luca Hostettler](https://github.com/lucahost)**
