# 🚀 Personal Website - Luca Hostettler

[![Build and Deploy](https://github.com/lucahost/personal-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/lucahost/personal-website/actions/workflows/deploy.yml)
[![CI](https://github.com/lucahost/personal-website/actions/workflows/ci.yml/badge.svg)](https://github.com/lucahost/personal-website/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.1-007FFF?style=flat-square&logo=mui&logoColor=white)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

Modern, responsive personal portfolio website built with cutting-edge web technologies. Features a sleek design, interactive components, and comprehensive project showcase.

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

### **Architecture & Patterns**
- **Custom React Hooks** - Reusable business logic
- **Error Boundaries** - Robust error handling
- **Lazy Loading** - Performance-optimized component loading
- **TypeScript Interfaces** - Comprehensive type definitions
- **Component Composition** - Modular and maintainable code

### **Development Tools**
- **ESLint 9** - Advanced code linting and quality checks
- **TypeScript ESLint** - Type-aware linting rules
- **React Hooks ESLint** - React-specific linting
- **Browserslist** - Cross-browser compatibility

### **Build & Deployment**
- **GitHub Actions** - Continuous Integration/Deployment
- **Multi-Node Testing** - Node.js 18.x and 20.x compatibility
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

## 🎯 Key Components

### **Project Showcase**
- **Interactive Cards**: Hover effects and smooth animations
- **Advanced Filtering**: Category-based and search functionality
- **Responsive Grid**: Adapts from mobile to desktop layouts
- **View Modes**: Toggle between grid and list views

### **Easter Egg Terminal**
- **Hidden Interface**: Subtle command line interface
- **Interactive Elements**: Type and press Enter for surprises
- **Rick Roll Integration**: Fun easter egg for curious visitors

### **Performance Features**
- **Code Splitting**: Lazy-loaded routes and components
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Image Optimization**: Efficient asset loading
- **Caching Strategy**: Optimized for fast repeat visits

## 🚢 Deployment

### GitHub Actions Workflows

The project uses GitHub Actions for continuous integration and deployment:

#### **CI Pipeline** (`ci.yml`)
- **Triggers**: Push to `dev`, `feature/*` branches and PRs to `master`/`dev`
- **Multi-Node Testing**: Tests on Node.js 18.x and 20.x
- **Quality Checks**: 
  - TypeScript compilation without emit
  - ESLint code quality checks
  - Production build verification
  - Bundle size analysis
- **Security**: Automated npm audit for vulnerabilities

#### **Deployment Pipeline** (`deploy.yml`)
- **Trigger**: Push to `master` branch
- **Build Process**: 
  - Install dependencies with npm ci
  - Run linting and quality checks
  - Build production artifacts with Vite
  - Upload artifacts for deployment
- **Deployment**:
  - SSH-based deployment to DigitalOcean droplet
  - Secure rsync with file synchronization
  - Files deployed to `/var/www/personal-website`
  - Deployment verification checks

### GitHub Secrets Configuration

For deployment to work, configure these secrets in your GitHub repository:

- `SSH_PRIVATE_KEY`: SSH private key for server access
- `SERVER_HOST`: Server hostname or IP address (e.g., `159.65.126.196`)
- `SERVER_USER`: SSH username for server access (e.g., `luca`)

### Manual Deployment

```bash
# Build for production
npm run build

# Deploy to server (requires SSH setup)
rsync -avz --delete dist/ user@server:/var/www/personal-website/
```

## 🔧 Configuration

### Environment Variables
The application supports environment-specific configuration through Vite's built-in environment handling:

```typescript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_URL
const isDev = import.meta.env.DEV
```

### Browser Support
Configured for modern browsers with automatic polyfills:
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions  
- Safari: Last 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## 📊 Performance Metrics

- **Bundle Size**: ~358KB (gzipped: ~116KB)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Lighthouse Score**: 95+ across all metrics

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI Team** - For the excellent React component library
- **Vite Team** - For the blazing-fast build tool
- **React Team** - For the amazing framework
- **TypeScript Team** - For bringing type safety to JavaScript

---

**Built with ❤️ by [Luca Hostettler](https://github.com/lucahost)**

*Showcasing modern web development practices and cutting-edge technologies for potential employers and collaborators.*