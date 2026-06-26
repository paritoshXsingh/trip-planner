# ✈️ TripPilot – AI Powered Travel Planner

TripPilot is a full-stack AI-powered travel planning application that helps users generate personalized travel itineraries in seconds using Google's Gemini AI.

Users can create trips based on their destination, duration, budget, and interests, then manage every aspect of the itinerary—from activities and packing lists to exporting a beautifully formatted PDF.

The project demonstrates full-stack development, AI integration, JWT authentication, Docker containerization, and AWS deployment.

---

# 🌐 Live Demo

**Application:** https://trippilot-paritosh.duckdns.org

# 🚀 Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent Login

---

## AI Trip Generation

Generate personalized trips using **Google Gemini AI**.

The AI generates:

- Multi-day itinerary
- Budget estimation
- Recommended hotels
- Packing checklist

If Gemini is unavailable, the application automatically falls back to an internal itinerary generator to ensure uninterrupted user experience.

---

## Dashboard

Users can:

- View all created trips
- Open trip details
- Delete trips
- Create unlimited trips

---

## Trip Details

Each trip includes:

- Destination
- Duration
- Budget
- AI Provider
- Daily itinerary
- Hotels
- Budget breakdown
- Packing checklist

---

## Editable Itinerary

Users can:

- Add activities
- Delete activities
- Save itinerary changes
- Regenerate an individual day using AI

---

## Packing Checklist

Interactive packing management:

- Mark items as packed
- Progress bar
- Add custom items
- Delete custom items
- Automatic database persistence

---

## Budget Breakdown

Estimated costs for:

- Flights
- Accommodation
- Food
- Activities
- Total Budget

---

## Hotel Recommendations

AI-generated hotel suggestions based on trip preferences.

---

## PDF Export

Generate a professional travel itinerary PDF including:

- Destination
- Duration
- Budget
- AI Provider
- Complete itinerary
- Budget table
- Hotel recommendations
- Packing checklist
- Packing progress
- Generation timestamp
- Professional formatting
- Automatic page breaks
- Footer and page numbers

---

# 🛠 Tech Stack

## Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Axios
- Sonner
- Lucide Icons
- jsPDF
- jsPDF AutoTable

---

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Google Gemini API

---

## DevOps

- Docker
- Docker Compose
- AWS EC2
- Ubuntu Server

---

# 📂 Project Structure

```
trip-planner/

├── client/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── server/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Environment Variables

## Backend (.env)

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

## Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# 💻 Running Locally

## 1. Clone Repository

```bash
git clone https://github.com/paritoshXsingh/trip-planner.git

cd trip-planner
```

---

## 2. Install Dependencies

### Backend

```bash
cd server

npm install
```

### Frontend

```bash
cd ../client

npm install
```

---

## 3. Configure Environment Variables

Create:

```
server/.env
```

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

GEMINI_API_KEY=your_api_key
```

Create:

```
client/.env.local
```

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 4. Run Backend

```bash
cd server

npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## 5. Run Frontend

```bash
cd client

npm run dev
```

Runs on:

```
http://localhost:3000
```

---

# 🐳 Running with Docker

## Clone

```bash
git clone https://github.com/paritoshXsingh/trip-planner.git

cd trip-planner
```

---

## Configure Environment Variables

Backend:

```
server/.env
```

Frontend:

```
client/.env.local
```

---

## Build Containers

```bash
docker compose build
```

---

## Start Containers

```bash
docker compose up -d
```

Application:

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:5000
```

---

## Stop Containers

```bash
docker compose down
```

---

# ☁️ AWS Deployment

The application is containerized using Docker and deployed on an Ubuntu EC2 instance.

Deployment workflow:

```bash
git pull

docker-compose up -d --build
```

Infrastructure:

- AWS EC2
- Docker
- Docker Compose
- MongoDB Atlas
- Google Gemini API

---

# 📄 REST API

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Trips

```
POST /api/trips

GET /api/trips

GET /api/trips/:id

PUT /api/trips/:id

DELETE /api/trips/:id
```

---

## Itinerary

```
PUT /api/trips/:id/itinerary

POST /api/trips/:id/regenerate-day
```

---

## Packing

```
PUT /api/trips/:id/packing-list
```

---

# 📈 Future Improvements

- Interactive maps
- Flight API integration
- Hotel booking integration
- Expense tracking
- Weather forecasts
- Collaborative trip planning
- Offline support
- Email itinerary sharing
- Custom themes
- Calendar integration

---

# 🎯 Learning Outcomes

This project demonstrates experience with:

- Full Stack MERN Development
- Next.js App Router
- TypeScript
- JWT Authentication
- REST API Design
- MongoDB Atlas
- Google Gemini AI Integration
- Docker Containerization
- Docker Compose
- AWS EC2 Deployment
- Responsive UI Design
- PDF Generation
- State Management
- Production Deployment
- Git & GitHub Workflow

---

# 👨‍💻 Author

**Paritosh Singh**

GitHub: https://github.com/paritoshXsingh

LinkedIn: https://www.linkedin.com/in/paritosh-singh-dev

---

If you found this project interesting, feel free to ⭐ the repository.
