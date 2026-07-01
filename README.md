# ✈️ TripPilot – AI Powered Travel Planner

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Express](https://img.shields.io/badge/Express.js-Node-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)
![AWS](https://img.shields.io/badge/AWS-EC2-orange)

TripPilot is a production-ready AI-powered travel planner that generates personalized travel itineraries using Google's Gemini AI. It enables users to securely create and manage trips, receive AI-generated day-wise itineraries, estimate budgets, get hotel recommendations, customize itineraries, regenerate individual travel days, and export trips as PDF documents.

## 🌐 Live Demo

**https://trippilot-paritosh.duckdns.org**

## 💻 GitHub

**https://github.com/paritoshXsingh/trip-planner**

---

# 📖 Project Overview

TripPilot simplifies travel planning by combining AI with modern full-stack development. After authentication, users enter a destination, duration, budget and interests. The backend constructs a structured prompt for Gemini AI, receives a complete itinerary, validates it, stores it in MongoDB Atlas and presents it through a responsive Next.js interface.

The application supports complete itinerary management instead of treating AI output as static. Users can add their own activities, delete unwanted activities, regenerate only a selected day, and export the final itinerary as a PDF.

---

# ✨ Features

## Authentication & Authorization
- User Registration & Login
- JWT Authentication
- Protected Routes
- User-specific Dashboard
- User data isolation

## AI Travel Planning
- Generate personalized itineraries
- Budget estimation
- Hotel recommendations
- Day-wise activity planning

## Trip Management
- Create Trips
- View Trips
- View Trip Details
- Delete Trips

## Itinerary Management
- ➕ Add Custom Activities
- ❌ Delete Activities
- 🔄 Regenerate Individual Days using AI

## Custom Feature
- 📄 Export complete itinerary as PDF

---

# 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB Atlas |
| AI | Google Gemini API |
| Authentication | JWT |
| Deployment | Docker, Docker Compose, AWS EC2, Nginx |
| Security | Let's Encrypt SSL, HTTPS |
| Domain | DuckDNS |

## Why this stack?

- **Next.js** for performant React applications.
- **TypeScript** for type safety and maintainability.
- **Express.js** for modular REST APIs.
- **MongoDB Atlas** for flexible document storage.
- **Docker** for reproducible deployments.
- **Nginx** as a reverse proxy serving frontend and backend under one HTTPS domain.
- **Gemini AI** for intelligent itinerary generation.

---

# 📂 Project Structure

```text
trip-planner/
├── client/
├── server/
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Setup Instructions

## Local Development

### Clone

```bash
git clone https://github.com/paritoshXsingh/trip-planner.git
cd trip-planner
```

### Backend

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GEMINI_API_KEY=your_key
```

Run

```bash
npm run dev
```

### Frontend

```bash
cd client
npm install
```

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 🐳 Docker Setup

Create the required environment files:

- `server/.env`
- `client/.env.local`

Run:

```bash
docker-compose up --build -d
```

---

# ☁️ Production Deployment

The application is deployed on AWS EC2.

Infrastructure:

- Docker
- Docker Compose
- Nginx Reverse Proxy
- DuckDNS Domain
- Let's Encrypt SSL
- MongoDB Atlas

Live URL:

**https://trippilot-paritosh.duckdns.org**

---

# 🏗 High-Level Architecture

```text
          Browser
              │
              ▼
      Nginx Reverse Proxy
      ├───────────────┐
      ▼               ▼
 Next.js Frontend   Express API
                        │
                        ▼
                 MongoDB Atlas
                        │
                        ▼
                 Google Gemini AI
```

---

# 🔐 Authentication & Authorization

1. User registers.
2. Password is hashed before storage.
3. User logs in.
4. JWT token is generated.
5. Token is attached to protected requests.
6. Middleware validates the token.
7. APIs only return resources owned by the authenticated user.

---

# 🤖 AI Agent Design & Purpose

The backend constructs prompts from:

- Destination
- Number of days
- Budget
- Interests

Gemini AI generates:

- Day-wise itinerary
- Budget estimate
- Hotel recommendations

The generated itinerary is editable. Users can add custom activities, remove AI-generated ones, or regenerate only a selected day to reduce unnecessary AI calls.

---

# ⭐ Creative Feature

## Editable AI Itinerary

Instead of locking users into AI output, TripPilot lets users:

- Add custom activities
- Delete activities
- Regenerate specific days

This creates a hybrid workflow combining AI assistance with complete user control.

## PDF Export

Users can download a professionally formatted itinerary for offline access and sharing.

---

# 🎯 Key Design Decisions & Trade-offs

- TypeScript for maintainability and type safety.
- MongoDB for flexible nested itinerary documents.
- JWT for stateless authentication.
- Docker for consistent environments.
- Nginx reverse proxy to eliminate CORS and mixed-content issues.
- Regenerate one day instead of the entire itinerary to reduce AI cost and improve responsiveness.

---

# ⚠️ Known Limitations

- AI output may vary.
- Budget estimates are approximate.
- Hotel recommendations are AI-generated, not live booking data.
- No email verification or password reset.
- No collaborative trip editing.
- Limited caching and rate limiting.

---

# 🚀 Future Improvements

- Live hotel APIs
- Weather integration
- Maps integration
- Collaborative trip planning
- Email verification
- OAuth login
- AI chat assistant

---

# 📚 Learning Outcomes

This project strengthened my understanding of:

- Full-stack architecture
- TypeScript
- JWT authentication
- REST API design
- AI integration
- Docker & Docker Compose
- AWS EC2 deployment
- Nginx reverse proxy
- HTTPS with Let's Encrypt
- Production debugging

---

# 👨‍💻 Author

**Paritosh Singh**

- GitHub: https://github.com/paritoshXsingh
- Live Demo: https://trippilot-paritosh.duckdns.org