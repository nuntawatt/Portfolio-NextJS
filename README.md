# Portfolio

A modern, high-performance portfolio ecosystem featuring a **Next.js 16** frontend and a dedicated **NestJS** monolithic backend. Designed for speed, secure authentication, and a premium developer experience.

---

## 🏗️ Project Architecture

This repository contains two main components working together to provide a seamless experience:
- **`portfolio/`**: A cutting-edge frontend built with Next.js App Router and React 19.
- **`backend/`**: A robust, monolithic NestJS server handling authentication and business logic.

---

## ✨ Features

### Frontend (Next.js)
- **Secure Auth UI**: Refactored, high-performance Sign In/Sign Up components with glassmorphism design.
- **Premium UX**: Fluid animations with Framer Motion and modern typography using the Geist font.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop using Tailwind CSS 4.
- **Branded Icons**: Custom-mapped tech icons for NestJS, Docker, RabbitMQ, and more.

### Backend (NestJS)
- **JWT Authentication**: Full login/registration cycle using Passport and JWT strategies.
- **Security**: Password hashing with Bcrypt and strict data validation using `class-validator`.
- **Organized Structure**: Clear separation between DTOs, Entities, Strategies, and Guards.
- **Global Validation**: Automated request sanitization and error reporting.

---

## 🛠️ Tech Stack

| Component | technologies |
| :--- | :--- |
| **Frontend** | Next.js 16, React 19, Tailwind CSS 4, Framer Motion, Lucide |
| **Backend** | NestJS 11+, Passport, JWT, Bcrypt, Class Validator |
| **Common** | TypeScript, pnpm |

---

## 📁 Project Structure

```text
/
├── portfolio/             # Next.js Frontend
│   ├── src/
│   │   ├── features/      # Feature-based logic (auth, portfolio, etc.)
│   │   ├── shared/        # Shared components (AuthLayout, AuthInput)
│   │   └── app/           # App Router Pages
│   └── public/            # Static Assets
│
├── backend/               # NestJS Backend
│   ├── src/
│   │   ├── auth/          # Auth Module (Login/Register, JWT, Guards)
│   │   │   ├── dto/       # Data Transfer Objects
│   │   │   ├── strategies/# Passport Strategies (JWT)
│   │   │   └── guards/    # Auth Guards
│   │   ├── users/         # Users Module (Entities, Services)
│   │   └── main.ts        # Application Entry & Global Pipes
│   └── nest-cli.json
│
└── README.md              # Unified Documentation
```

---

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v20+)
- [pnpm](https://pnpm.io/) (Highly Recommended)

### 2. Frontend Setup
```bash
cd portfolio
pnpm install
pnpm dev
```
*Running on: http://localhost:3000*

### 3. Backend Setup
```bash
cd backend
pnpm install
pnpm run start:dev
```
*Running on: http://localhost:3001*

---

## 📄 License
This project is for educational and portfolio purposes. Feel free to use it as a reference!