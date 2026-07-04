# HimShakti AI — Product Description Generator

AI-powered web application that generates professional, platform-ready 
product descriptions for HimShakti Food Processing Unit (Haldwani, Uttarakhand).

## Features
- Responsive Navbar, Hero, Card, Footer components
- 4 page routes: Home, Generate, About, Login
- shadcn/ui component library: Button, Input, Dialog, Sonner (Toast), Skeleton (Loader)
- Dark/Light mode toggle with next-themes
- Live demo/showcase page at /demo
- Express backend with 6 REST API endpoints (Week 4)

## Tech Stack
- Next.js 16 (App Router)
- React
- Tailwind CSS v4
- shadcn/ui (Radix + Nova preset)
- next-themes
- Express.js (backend)

## Pages
| Route | Description |
|---|---|
| / | Home page with product grid |
| /generate | AI description generator (input working, AI integration Week 7) |
| /about | About HimShakti |
| /login | Authentication (Week 6) |
| /demo | Component library showcase |

## How to Run Backend Locally

1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in `/backend` based on `.env.example`
4. Start the dev server: `npm run dev`
5. Backend runs on `http://localhost:5000`
6. Test endpoints using the Postman collection: `W4_APICollection_TBI26100231.json`

### API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/products | List all products |
| GET | /api/products/:id | Get single product |
| POST | /api/generate | Generate a product description |
| GET | /api/history | List generation history |
| DELETE | /api/history/:id | Delete a history entry |
| GET | /api/history/search?q= | Search history by product name |

## Database

**Database:** PostgreSQL via Supabase (free tier, Seoul region)  
**ORM:** Prisma v6  

### Schema
Two tables:
- `Product` — stores HimShakti product catalog (id, title, description)
- `GenerationHistory` — stores all AI-generated descriptions (id, productName, generatedText, tone, createdAt)

### Set up the database locally
1. Create a free project at supabase.com
2. Copy your connection string from Project Settings → Database
3. Add to `backend/.env`: `DATABASE_URL="your_connection_string"`
4. Run `cd backend && npx prisma migrate dev`
5. Seed sample products: `node prisma/seed.js`

## Built By
Anshuman Chanial | TBI-26100231  
TBI-GEU Summer Internship Program 2026  
Track: AI-Assisted Full Stack Web Development