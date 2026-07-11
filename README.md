# HimShakti AI — Product Description Generator

AI-powered web application that generates professional, platform-ready 
product descriptions for HimShakti Food Processing Unit (Haldwani, Uttarakhand).

## Features
- Responsive Navbar, Hero, Card, Footer components
- 5 page routes: Home, Generate, About, Login, Register
- shadcn/ui component library: Button, Input, Dialog, Sonner (Toast), Skeleton (Loader)
- Dark/Light mode toggle with next-themes
- Live demo/showcase page at /demo
- Express backend with REST API endpoints (Week 4) + Supabase/Prisma persistence (Week 5)
- **User authentication (Week 6):**
  - Registration & login with bcrypt password hashing
  - JWT-based session tokens (7-day expiry)
  - Protected API routes via `requireAuth` middleware
  - Protected frontend routes via `ProtectedRoute` component (redirects to `/login` if not authenticated)
  - Google OAuth login via Passport.js
  - Rate limiting on auth endpoints (5 attempts / 15 min)
  - Input validation via express-validator

## Tech Stack
- Next.js 16 (App Router)
- React
- Tailwind CSS v4
- shadcn/ui (Radix + Nova preset)
- next-themes
- Express.js (backend)
- PostgreSQL (Supabase) + Prisma v6 ORM
- bcrypt, jsonwebtoken, passport + passport-google-oauth20
- express-validator, express-rate-limit

## Pages
| Route | Description |
|---|---|
| / | Home page with product grid |
| /generate | AI description generator — **protected**, requires login |
| /about | About HimShakti |
| /login | Login (email/password + Google OAuth) |
| /register | Create a new account |
| /demo | Component library showcase — **protected**, requires login |

## How to Run Backend Locally

1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in `/backend` based on `.env.example` — needs `DATABASE_URL`, `JWT_SECRET`, `SESSION_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
4. Start the dev server: `npm run dev`
5. Backend runs on `http://localhost:5000`
6. Test endpoints using the Postman collection: `W6_AuthAPICollection_TBI-26100231.json`

### API Endpoints

**Products & Generation**
| Method | Endpoint | Auth required |
|---|---|---|
| GET | /api/products | No |
| GET | /api/products/:id | No |
| POST | /api/generate | Yes |
| GET | /api/history | Yes |
| PUT | /api/history/:id | Yes |
| DELETE | /api/history/:id | Yes |
| GET | /api/history/search?q= | Yes |

**Auth**
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register with email + password (bcrypt hashed) |
| POST | /api/auth/login | Login, returns JWT |
| GET | /api/auth/google | Start Google OAuth flow |
| GET | /api/auth/google/callback | Google OAuth callback, redirects with JWT |

Protected routes require an `Authorization: Bearer <token>` header.

## Database

**Database:** PostgreSQL via Supabase (free tier, Seoul region)  
**ORM:** Prisma v6  

### Schema
Three tables:
- `Product` — stores HimShakti product catalog (id, title, description)
- `GenerationHistory` — stores all AI-generated descriptions (id, productName, generatedText, tone, createdAt)
- `User` — stores registered accounts (id, email, password [bcrypt hash], createdAt)

### Set up the database locally
1. Create a free project at supabase.com
2. Copy your connection string from Project Settings → Database
3. Add to `backend/.env`: `DATABASE_URL="your_connection_string"`
4. Run `cd backend && npx prisma migrate dev`
5. Seed sample products: `node prisma/seed.js`

## Authentication Setup Notes
- To enable Google OAuth locally, create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com), and set the authorized redirect URI to `http://localhost:5000/api/auth/google/callback`.
- JWTs are stored in the frontend's `localStorage` and sent as `Authorization: Bearer <token>` headers on protected requests.

## Built By
Anshuman Chanial | TBI-26100231  
TBI-GEU Summer Internship Program 2026  
Track: AI-Assisted Full Stack Web Development