# YTS Movie Browser

A modern, responsive movie browsing application built with React 19 and TypeScript. Browse, search, and discover movies with a beautiful, performant interface featuring Progressive Web App capabilities, offline support, and advanced caching strategies.

## Live Demo

**🌐 [https://yts-react.jacob-jordan.me](https://yts-react.jacob-jordan.me)**

Experience the full PWA functionality, offline support, and optimized performance in production.

## Technical Highlights

This project showcases modern web development practices and performance optimization techniques:

### Progressive Web App (PWA)

- **Service Worker Integration** - Workbox-powered caching strategies for optimal performance
- **Offline Support** - Full functionality with network status detection and automatic retry
- **Runtime Caching** - NetworkFirst for API calls (1 hour), CacheFirst for images (30 days)
- **Asset Precaching** - ~3.4MB of static assets cached for instant repeat visits

### Performance Optimizations

- **Image Optimization** - WebP format with 97% size reduction (1.8MB → 59KB)
- **Bundle Analysis** - Visualized bundle sizes with rollup-plugin-visualizer
- **Lazy Loading** - Background images and route-based code splitting
- **Smart Retry Logic** - Exponential backoff for failed API requests with intelligent error handling

### Code Quality & Developer Experience

- **Pre-commit Hooks** - Husky + lint-staged for automated linting and formatting
- **Prettier Integration** - Consistent code style across the project
- **TypeScript Strict Mode** - Full type safety with comprehensive type coverage
- **React 19 Compiler** - Automatic memoization and performance optimizations

### Security & Production Readiness

- **Comprehensive Security Headers** - CSP, X-Frame-Options, X-Content-Type-Options, etc.
- **Enhanced nginx Configuration** - Split caching rules, ETags, and compression
- **SEO Optimization** - robots.txt, sitemap.xml, and Open Graph metadata
- **Error Boundaries** - Graceful error handling throughout the application

## Performance Metrics

### Bundle Sizes

- **Main Bundle:** 242 KB raw / 76 KB gzipped
- **Radix UI:** 103 KB raw / 34 KB gzipped
- **React Vendor:** 45 KB raw / 16 KB gzipped
- **Icons:** 28 KB raw / 6 KB gzipped
- **Total Initial Load:** ~580 KB raw / ~160 KB gzipped

### Image Optimization

- **Background Image:** 1.8 MB PNG → 59 KB WebP (97% reduction)
- **Format:** WebP with fallbacks for compatibility

### Caching Strategy

- **Static Assets:** 1 year immutable cache
- **Images:** 30 days with CacheFirst strategy
- **API Responses:** 1 hour with NetworkFirst strategy
- **Service Worker:** Precaches 24 static assets (~3.4 MB)

## Features

### User-Facing Features

- Browse featured and popular movies
- Advanced search with real-time results
- Filter by genre, quality, rating, and more
- Fully responsive design (mobile, tablet, desktop)
- Dark mode interface with custom theming
- Movie details with trailers and download options
- Offline support with automatic retry

### Technical Features

- Progressive Web App (PWA) with installability
- Real-time network status detection and offline indicator
- Intelligent API retry with exponential backoff
- Background image lazy loading for better performance
- Service worker caching for faster repeat visits
- Modern UI with Radix UI primitives and Tailwind CSS 4
- Type-safe development with TypeScript

## Tech Stack

- **Framework:** React 19.1.1
- **Language:** TypeScript 5.9
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn and Radix UI primitives
- **Routing:** React Router 7
- **Icons:** Lucide React
- **Compiler:** React Compiler (experimental)

## Key Technical Highlights

- **React 19 Compiler** - Automatic optimizations for better performance
- **Modern Tooling** - Vite for lightning-fast builds and HMR
- **Type Safety** - Full TypeScript coverage
- **Component Architecture** - Modular, reusable components with consistent patterns
- **Code Splitting** - Optimized bundle chunks for faster loading
- **Custom Hooks** - Reusable logic for API calls and state management

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jacobjordan94/yts-react.git
cd yts-react

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and run
docker-compose up -d

# The app will be available at http://localhost:8080

# Stop the container
docker-compose down
```

### Using Docker Directly

```bash
# Build the image
docker build -t yts-react .

# Run the container
docker run -p 8080:80 yts-react
```

## Project Structure

```
yts-react/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── movie/      # Movie-specific components
│   │   ├── ui/         # Base UI components
│   │   ├── filter/     # Filter components
│   │   ├── search/     # Search components
│   │   └── ...
│   ├── hooks/          # Custom React hooks
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── lib/            # Utility functions
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── dist/               # Production build output
```

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production with optimizations
- `npm run build:analyze` - Build and generate bundle size analysis report
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks on all files
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without making changes

## Performance Optimizations

### Build & Bundle Optimization

- **Manual Chunk Splitting** - Separate chunks for React, Radix UI, and icons
- **React 19 Compiler** - Automatic memoization and performance optimizations
- **Lazy Loading** - Route-based code splitting and component lazy loading
- **Tree Shaking** - Dead code elimination with Vite
- **Bundle Analysis** - Visualizer plugin for monitoring bundle sizes

### Runtime Performance

- **PWA Service Worker** - Workbox-powered caching with NetworkFirst and CacheFirst strategies
- **Asset Precaching** - Critical static assets preloaded for instant access
- **Image Lazy Loading** - Native lazy loading for movie posters and backgrounds
- **Smart API Retry** - Exponential backoff for failed requests (default: 3 retries, 1s delay)
- **Request Caching** - 5-minute in-memory cache for API responses

### Asset Optimization

- **Image Optimization** - WebP format with 97% size reduction (kenobi.webp)
- **Compression** - Gzip level 6 compression with optional brotli support
- **Enhanced nginx Caching** - Immutable assets (1 year), images (30 days), HTML (no-cache)
- **ETags** - Cache validation for efficient resource updates

### Network Resilience

- **Offline Support** - Full functionality with service worker caching
- **Network Detection** - Real-time online/offline status with visual indicator
- **Retry Logic** - Smart retry on 5xx errors and 429 rate limits (skips 4xx client errors)
- **Abort Controllers** - Proper cleanup of in-flight requests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - see [LICENSE](LICENSE) file for details.

This is a portfolio project showcasing modern React development practices, performance optimization techniques, and production-ready web application architecture.

---
