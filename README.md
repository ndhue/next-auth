# Next Auth Practice

This project is a practice implementation of authentication in Next.js using [NextAuth.js](https://next-auth.js.org/). It demonstrates how to set up user registration, login, and social authentication in a modern Next.js application.

## Features

- User registration and login
- Social authentication (Google, GitHub, etc.)
- Protected routes
- Custom authentication forms
- Prisma integration for user management

## Tech Stack

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) (if used)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ndhue/next-auth-practice.git
   cd next-auth-practice
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env.local` and fill in the required values (database URL, NextAuth providers, etc.).

4. **Set up the database:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/` - Next.js app directory (pages, layouts, authentication routes)
- `components/` - Reusable UI and authentication components
- `actions/` - Server actions for login and registration
- `lib/` - Database and utility functions
- `prisma/` - Prisma schema and migrations
- `schemas/` - Validation schemas

## Customization

- Add or configure authentication providers in `app/api/auth/[...nextauth].ts` (or similar route).
- Update Prisma schema in `prisma/schema.prisma` for custom user fields.

## License

This project is for learning and practice purposes.
