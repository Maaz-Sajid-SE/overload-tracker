# Overload - Strength Training & Progressive Overload Tracker

"Overload" is an advanced, data-driven web application tailored for strength athletes to meticulously log and analyze progressive overload on heavy compound lifts.

## 🚀 Module 1 Completed Features
- **Frontend Architecture:** Initialized with Next.js 14 (App Router), React, and Tailwind CSS.
- **Database:** Integrated a live PostgreSQL database hosted on Neon.
- **ORM:** Configured Prisma ORM with relational schema definitions for Users, Workouts, and Sets.
- **Authentication:** Implemented secure session management using NextAuth.js and GitHub OAuth.
- **UI/UX:** Designed responsive Dashboard Layout featuring protected routing and navigation components.

## 🛠️ Technology Stack
- **Framework:** Next.js (TypeScript)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Auth:** NextAuth.js

## 💻 Local Setup Instructions
To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Maaz-Sajid-SE/overload-tracker.git`
2. Install dependencies: `npm install`
3. Configure environment variables in a `.env` file:
   - `DATABASE_URL` (Neon PostgreSQL string)
   - `NEXTAUTH_URL="http://localhost:3000"`
   - `NEXTAUTH_SECRET`
   - `GITHUB_ID`
   - `GITHUB_SECRET`
4. Sync the database: `npx prisma db push`
5. Start the development server: `npm run dev`
