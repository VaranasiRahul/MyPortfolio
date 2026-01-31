# Replit.md - Portfolio Application

## Overview

This is a single-page portfolio website for Rahul Varanasi, a DevOps Engineer. The application displays professional information including skills, work experience, education, projects, and a contact form. Data is stored in PostgreSQL and served via a REST API, with a React frontend providing smooth animations and modern UI components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (single-page application)
- **State Management**: TanStack React Query for server state management and caching
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for page transitions and scroll reveal effects
- **Navigation**: react-scroll for smooth scrolling between sections
- **Icons**: Lucide React icon library

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript compiled with tsx
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schema validation
- **Structure**: Centralized route registration in `server/routes.ts`, storage abstraction in `server/storage.ts`

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` - contains tables for skills, experience, education, projects, and contact messages
- **Migrations**: Drizzle Kit manages schema changes, output to `./migrations` directory
- **Seeding**: Database seeds on server startup if tables are empty (see `storage.ts`)

### API Structure
All endpoints are prefixed with `/api`:
- `GET /api/skills` - Retrieve skills by category
- `GET /api/experience` - Retrieve work experience entries
- `GET /api/education` - Retrieve education records
- `GET /api/projects` - Retrieve project details
- `POST /api/contact` - Submit contact form messages

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Custom build script using esbuild for server bundling and Vite for client
- **Output**: Server compiled to `dist/index.cjs`, client assets to `dist/public`

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: PostgreSQL session storage (available but not currently used)

### UI Component Library
- **shadcn/ui**: Pre-built accessible components based on Radix UI primitives
- **Radix UI**: Underlying headless component library for dialogs, menus, forms, etc.
- **class-variance-authority**: Component variant styling system

### Fonts
- **Google Fonts**: Inter and Plus Jakarta Sans loaded via CDN in `client/index.html`

### Replit-Specific Plugins
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development environment indicator (dev only)