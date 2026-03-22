# 🚀 Portfolio-NextJS

A modern, high-performance portfolio application built with **Next.js 15/16**, **React 19**, and **Tailwind CSS 4**. Designed for speed, aesthetics, and a premium user experience.

<!-- ![Portfolio Banner](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.png) *(Note: Replace with your actual portfolio screenshot)* -->

---

## ✨ Features

- **Secure Authentication**: Integrated with [NextAuth.js](https://next-auth.js.org/) for robust user sign-in/up.
- **Premium UI/UX**: Crafted using [Shadcn UI](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/) components.
- **Smooth Animations**: Powered by [Framer Motion](https://www.framer.com/motion/) for delightful transitions.
- **Fully Responsive**: Optimized for all devices—from mobile to desktop.
- **High Performance**: Utilizing Next.js App Router and Server Components.
- **Scalable Architecture**: Organized with a feature-based folder structure.

---

## 🛠️ Tech Stack

### Frontend & Core
- **Framework**: [Next.js 16 (Canary)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Tools & Libraries
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Components**: Shadcn UI & Radix UI
- **Authentication**: NextAuth.js
- **Animations**: Framer Motion

---

## 📁 Project Structure

The project follows a modular, feature-based architecture for better maintainability.

```text
/portfolio
├── src/
│   ├── app/           # Next.js App Router (Pages & Layouts)
│   ├── features/      # Business logic grouped by feature (e.g., auth)
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── containers/
│   │   │   └── schemas/
│   ├── components/    # Reusable UI components (Shared)
│   ├── lib/           # Utility functions and configurations
│   └── styles/        # Global CSS and Tailwind configs
└── public/            # Static assets
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (Recommended)

### Installation

```bash
pnpm install
```

```bash
pnpm dev
```

---