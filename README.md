# Portfolio Platform

A modern, high-performance full-stack portfolio ecosystem featuring a Next.js 16 frontend and a dedicated NestJS monolithic backend. This system is designed for high speed, secure authentication, media storage, and a premium user experience.

---

## Project Architecture

This repository is structured as a monorepo containing two main components:
* **portfolio**: A client-side frontend application built with Next.js App Router and React 19.
* **backend**: A server-side RESTful API built with NestJS handling authentication, email dispatch, upload processing, and business logic.

---

## Technical Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, Lucide, Zustand, TanStack Query (React Query) |
| **Backend** | NestJS 11, Prisma ORM, PostgreSQL, Passport.js, JWT, Bcrypt, Resend API, MinIO / Supabase S3 Storage, Redis |
| **Common** | TypeScript, pnpm |

---

## Features

### Frontend (Next.js)
* **Secure Authentication Flow**: Custom Sign In, Sign Up, Email Verification, and Password Reset layouts backed by stateful validation.
* **Localization**: Full multilingual support (English and Thai) with language toggle capabilities.
* **Interactive UI/UX**: Premium aesthetic featuring glassmorphism, responsive navigation with active section tracking, custom audio toggle, and interactive particle canvas backgrounds.
* **Decoupled API Client**: Clean separation between UI layers, custom React hooks, and API request configurations using Axios.

### Backend (NestJS)
* **Robust Authentication**: Email-based signup and signin, password hashing with Bcrypt, local JWT strategy, and social OAuth integration (Google & GitHub).
* **Prisma ORM & PostgreSQL**: Structured relational schema modeling for users, accounts, profile data, and contact logs.
* **S3 Object Storage**: Profile and media upload processing connected to MinIO (local dev) or Supabase Storage (production).
* **Rate Limiting**: Built-in Throttler protection against brute-force attacks on auth and contact form endpoints.
* **Global Error Handling**: Custom global exception filters and interceptors for structured logging and standardized JSON API response formats.

---

## Project Structure

```text
/
├── portfolio/             # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router Pages & Layouts
│   │   ├── config/        # Site Config & Metadata
│   │   ├── feature/       # Feature-based logic (about, audio, auth, contact, hero, skill)
│   │   ├── lib/           # Utility integrations (Axios client, etc.)
│   │   ├── locales/       # Localization JSONs (en, th)
│   │   └── shared/        # Reusable UI components & hooks
│   └── package.json
│
├── backend/               # NestJS Backend
│   ├── src/
│   │   ├── auth/          # Auth Module (Login/Register, JWT, Guards, OAuth)
│   │   ├── common/        # Core configuration, filters, and interceptors
│   │   ├── contact/       # Contact form submissions and email dispatcher
│   │   ├── database/      # Prisma client and database module
│   │   ├── upload/        # S3 Upload service and controller
│   │   └── users/         # Users and database operations
│   ├── prisma/            # Database schema and seed scripts
│   └── package.json
│
└── README.md              # Project Documentation
```

---

## Getting Started

### Prerequisites
* Node.js (v20 or higher)
* pnpm (highly recommended)
* Docker Desktop (for database, Redis, and storage services)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd Portfolio-NextJS
   ```

2. **Run Services with Docker**
   Start PostgreSQL, Redis, and MinIO instances in the backend folder:
   ```bash
   cd backend
   docker-compose up -d
   ```

3. **Backend Setup**
   * Copy the environment configuration file:
     ```bash
     cp .env.example .env
     ```
   * Configure database, JWT, Resend API, OAuth, and MinIO credentials inside `.env`
   * Install packages and start the development server:
     ```bash
     pnpm install
     pnpm run start:dev
     ```
   * The API server will be available at `http://localhost:3001`

4. **Frontend Setup**
   * Navigate to the frontend directory:
     ```bash
     cd ../portfolio
     ```
   * Install packages and start the development server:
     ```bash
     pnpm install
     pnpm dev
     ```
   * The application will run at `http://localhost:3000`

---

## License

This project is open-source and intended for educational and portfolio presentation purposes.