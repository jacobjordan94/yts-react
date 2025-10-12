# YTS Movie Browser

A modern, responsive movie browsing application built with React 19 and TypeScript. Browse, search, and discover movies with a beautiful, performant interface.

## Features

- Browse featured and popular movies
- Search functionality with real-time results
- Filter by genre, quality, and rating
- Fully responsive design
- Dark mode interface
- Optimized performance with React Compiler
- Modern UI with Radix UI components and Tailwind CSS

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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Performance Optimizations

- Manual chunk splitting for vendor libraries
- React Compiler for automatic memoization
- Lazy loading for routes and components
- Optimized asset loading with Vite
- Compressed production builds (gzip)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a portfolio project.

---

