# Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js 16](https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![NestJS 11](https://img.shields.io/badge/NestJS%2011-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-123A50?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind%204.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, production-ready, highly optimized full-stack portfolio ecosystem. Built using **Next.js 16 (App Router)** for a premium, interactive client experience and a high-performance **NestJS 11** backend monolithic API for secure authentication, file storage, rate limiting, and business logic.

---

## 🏛️ System Architecture

The ecosystem separates responsibilities cleanly between the interactive presentation layer (frontend), the secure data/computation layer (backend), and third-party utility integrations:

```mermaid
graph TD
    classDef client fill:#f5f3ff,stroke:#8b5cf6,stroke-width:2px;
    classDef server fill:#f0fdf4,stroke:#10b981,stroke-width:2px;
    classDef external fill:#f8fafc,stroke:#64748b,stroke-width:2px;
    classDef legend fill:#ffffff,stroke:#cccccc,stroke-width:1px;

    subgraph Client ["Client Layer (Next.js 16 • React 19)"]
        React["React 19<br/>(Server/Client Components)"]
        Zustand["Zustand<br/>(Global State)"]
        TanStack["TanStack Query<br/>(Async Server State)"]
        Motion["motion/react<br/>(GPU Animations)"]
    end
    class Client,React,Zustand,TanStack,Motion client;

    subgraph Server ["Server Layer (NestJS 11)"]
        Throttler["Rate Limiter<br/>(Throttler)"]
        
        Auth["Auth Module<br/>(JWT • OAuth)"]
        Upload["Upload Service<br/>(S3 Multipart)"]
        Contact["Contact & Mail<br/>(SMTP Dispatch)"]
        
        Prisma["Prisma ORM"]
    end
    class Server,Throttler,Auth,Upload,Contact,Prisma server;

    subgraph External ["External Services (Data & Third-Party)"]
        Postgres[("PostgreSQL<br/>(Primary Database)")]
        Redis[("Redis<br/>(Cache • Queue)")]
        S3[("MinIO / S3<br/>(Object Storage)")]
        Resend["Resend API<br/>(Email Delivery)"]
        OAuthProviders["Google / GitHub<br/>(OAuth Provider)"]
    end
    class External,Postgres,Redis,S3,Resend,OAuthProviders external;

    %% Network & Flow Connections
    Client -->|HTTPS| Throttler
    
    Throttler --> Auth
    Throttler --> Upload
    Throttler --> Contact
    
    Auth -.->|OAuth| OAuthProviders
    Auth -.->|Token Cache| Redis
    Upload -.->|S3 Multipart| S3
    Contact -.->|Email SMTP| Resend
    
    Auth --> Prisma
    Upload --> Prisma
    Contact --> Prisma
    
    Prisma --> Postgres
```

### 📦 1. Client Layer (Next.js 16 • React 19)
The client-side application is built using the Next.js App Router paradigm, serving as a highly interactive, responsive single-page application.
* **React 19:** Combines Server Components (for fast initial page render and SEO efficiency) with Client Components (for interactive elements).
* **Zustand:** Light-weight state container used for global client-side states (e.g., UI theme states, media toggles, and auth session caches).
* **TanStack Query (v5):** Handles asynchronous server state queries, providing clean caching, request deduplication, and loading/error states.
* **motion/react:** Implements premium, GPU-accelerated micro-animations with safe frame disposal and automatic reduced-motion detection.

### ⚙️ 2. Server Layer (NestJS 11)
A secure monolithic NestJS REST API that encapsulates the core business logic, validation guards, and data mappings.
* **Rate Limiter (Throttler):** Acts as a security firewall at the entry point of the server, guarding sensitive authentication and email dispatch routes against brute-force attacks.
* **Auth Module:** Manages session payloads, JWT token generation, local credentials verification, and OAuth2 callback mappings.
* **Upload Service:** Coordinates S3 multipart uploads to safely pipe asset streams directly to S3-compatible endpoints.
* **Contact & Mail:** Validates incoming message payloads and dispatches SMTP alerts.
* **Prisma ORM:** The data access layer, executing type-safe queries to the persistent database.

### 🌐 3. External Services (Data & Third-Party)
Infrastructure services and cloud APIs integrated to handle persistent storage and external utility dispatches:
* **PostgreSQL:** The primary relational database containing tables for users, user credentials, profiles, and contact submissions.
* **Redis:** High-speed in-memory database used for JWT blacklists, token session checks, and message queue caches.
* **MinIO / S3:** Object storage hosting profile pictures, files, and other assets.
* **Resend API:** Third-party cloud mail carrier dispatching emails via secure SMTP.
* **Google & GitHub OAuth:** Relies on OAuth2 providers to delegate federated client sign-ins safely.

---

## ⚡ Technical Stack

| Component | Technologies & Libraries |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS 4, `motion/react` v12, Lucide Icons, Zustand, TanStack Query (v5), Axios |
| **Backend** | NestJS 11, Prisma ORM, PostgreSQL, Passport.js, JWT, Bcrypt, Resend API, MinIO / Supabase S3 Object Storage, Redis |
| **Monorepo / DX** | TypeScript, pnpm workspace (clean monorepo setup) |

---

## ✨ Key Features

### 💻 Client Side (Next.js)
* **High-Performance Animations**: Reusable `<ScrollReveal>` component implementing `whileInView`, auto GPU-cleanup (`will-change: auto`), and `prefers-reduced-motion` compliance.
* **Premium UX/UI**: Dynamic glassmorphism effects, active nav section observers, responsive layouts, client-side audio toggle, and custom profile image zoom.
* **Secure Auth Flow**: Seamless integration of sign-in, sign-up, email verification, and password recovery with correct routes casing.
* **Multilingual Localization**: Complete context-based English (EN) and Thai (TH) translation setups.
* **Decoupled API Architecture**: Clean abstraction of state using Zustand and TanStack Query, and an API client layer using Axios.

### 🛡️ Server Side (NestJS)
* **Secure Authentication Module**: Password hashing with Bcrypt, JWT token issuance, local credential strategies, and secure OAuth2 (Google & GitHub).
* **Prisma & Relational Modeling**: Clean database schema definition modeling Users, Accounts, Profiles, and Contact Form Logs.
* **Multipart S3 Storage**: File upload controllers with automatic S3 storage uploads (configured for MinIO in local dev, Supabase S3 in production).
* **API Protection & Quality**: Rate-limiting (Throttling) protection for authentication endpoints and message submission APIs. Custom global error filters and formatted API intercepts.

---

## 📂 Project Structure

The project adopts a structured module directory pattern to keep code clean and self-contained:

```text
/
├── frontend/                     # Client Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router (Pages, Layouts, Routing)
│   │   ├── features/             # Feature-sliced modules (Independent domain logic)
│   │   │   ├── about/            # Biography, stats, and education cards
│   │   │   ├── audio/            # Ambient background sound controls
│   │   │   ├── auth/             # Sign-in, sign-up, forgot-password pages & logic
│   │   │   ├── contact/          # Contact form submitting queries
│   │   │   ├── hero/             # Landing header, greetings, and profile photo
│   │   │   ├── navigation/       # Header navbar and footer sections
│   │   │   ├── skill/            # Skills category listings and visual bars
│   │   │   └── theme/            # Light/Dark mode state management
│   │   └── shared/               # Globally shared components & libraries
│   │       ├── assets/locales/   # i18n Translation dictionaries (en.json, th.json)
│   │       ├── config/           # Centralized routes and site-wide constants
│   │       ├── lib/              # Client libraries, API clients, and custom hooks
│   │       └── ui/               # Primitive design system elements & animations
│   └── package.json
│
├── backend/                      # NestJS RESTful API Monolith
│   ├── src/
│   │   ├── auth/                 # Authentication, OAuth, JWT strategies, and Mail
│   │   ├── common/               # Core configurations, filters, decorators, and interceptors
│   │   ├── contact/              # Mail delivery service and contact submissions
│   │   ├── database/             # Prisma client initialization and module wrapper
│   │   ├── upload/               # AWS S3 upload service and client configurations
│   │   └── users/                # User data modules, controllers, and services
│   ├── prisma/                   # Prisma database schemas and seed configurations
│   └── package.json
│
└── README.md                     # Monorepo Documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v20 or higher
* **pnpm**: v9 or higher (highly recommended for performance)
* **Docker Desktop**: required for booting database, redis, and storage containers locally

### Step-by-Step Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd Portfolio-NextJS
```

#### 2. Spin Up Dev Infrastructure
Start PostgreSQL, Redis, and MinIO instances in the background using Docker Compose:
```bash
cd backend
docker-compose up -d
```

#### 3. Backend Setup
1. Copy the sample environment file:
   ```bash
   cp .env.example .env
   ```
2. Configure your environment variables in `.env` (S3 keys, Database URI, Resend API key, and OAuth client credentials).
3. Install dependencies and start the backend:
   ```bash
   pnpm install
   pnpm run start:dev
   ```
   *The backend REST API will boot up at `http://localhost:3001`.*

#### 4. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install client dependencies and run the Next.js development server:
   ```bash
   pnpm install
   pnpm dev
   ```
   *The frontend application will be active at `http://localhost:3000`.*

---

## 🛠️ Verification & Building

To verify that the entire codebase is free of type errors and compiles successfully for production:

```bash
# In the frontend directory
pnpm run build

# In the backend directory
pnpm run build
```

---

## 📝 License
This project is open-source and intended for educational and portfolio presentation purposes.