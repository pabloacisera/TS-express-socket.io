# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a TypeScript Express server with Socket.IO integration that serves a web application for managing clients and products with real-time communication capabilities. The application includes a basic facturation/billing system with EJS templating and jQuery-based frontend interactions.

## Development Commands

### Essential Commands
- **Development server**: `npm run dev` - Runs the TypeScript server with hot reload using tsx --watch
- **Build**: `npm run build` - Compiles TypeScript to JavaScript in the `dist/` directory
- **Production server**: `npm start` - Runs the compiled JavaScript from `dist/app.js`
- **Install dependencies**: `npm install`

### TypeScript Configuration
- Source files in `src/` compile to `dist/`
- Uses ES modules (`"type": "module"` in package.json)
- Module resolution: `nodenext` targeting `es2022`
- Strict TypeScript settings enabled

## Architecture & Structure

### Backend Architecture
- **Entry point**: `src/app.ts` - Main server configuration with Express, Socket.IO, and EJS setup
- **Configuration**: `src/config/envOps.ts` - Environment variables management using dotenv
- **Routes**: `src/routes/renderRoutes.ts` - All view rendering routes for the web interface
- **Data Models**: 
  - `src/utils/clients.ts` - Client entity with CRUD operations and mock data
  - `src/utils/products.ts` - Product entity with extensive mock product catalog
- **Types**: `src/types/ejs-mate.d.ts` - Custom type definitions for EJS templating

### Frontend Architecture
- **View Engine**: EJS with ejs-mate for layout inheritance
- **Main Layout**: `views/layouts/main.ejs` - Base template with navigation and auth section
- **Pages**: `views/` directory contains individual page templates (home, clients, products, etc.)
- **Static Assets**: `public/` directory structure:
  - `css/` - Stylesheets for different components
  - `js/` - jQuery-based JavaScript with modular helper functions
  - `img/` and `fonts/` - Static resources

### Key Features
- **Real-time Communication**: Socket.IO server configured with CORS support
- **Multi-page Navigation**: Home, Facturation (Products/Clients), and Historial sections
- **Data Management**: In-memory mock data for clients and products with UUID generation
- **Responsive UI**: jQuery-based interactions with spinner, toast, and modal helpers

### Socket.IO Integration
- Server configured in `src/app.ts` with CORS enabled for all origins
- Ready for real-time features but socket event handlers need to be implemented
- Port configurable via environment variable or defaults to 4041

### Development Notes
- Uses ES modules throughout (import/export syntax)
- File extensions required in imports due to ES module configuration
- TypeScript compilation preserves directory structure from `src/` to `dist/`
- Mock data includes comprehensive product catalog with various brands and categories
- Static assets served from `/assets` route pointing to `public/` directory

### Environment Setup
- Server port configurable via `PORT` environment variable
- Default port: 4041
- Environment variables loaded via dotenv in `src/config/envOps.ts`