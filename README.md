# Predusk Backend API

This is a **Node.js + Express backend** for managing user profiles, skills, and projects. It uses **MongoDB** as the database and supports authentication with JWT.

---

## Features

- User profile management (view, update)
- Skill management (add, list, filter)
- Project management (add, filter by skills)
- JWT-based authentication
- Rate-limiting and logging
- CORS-enabled for frontend integration

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Authentication:** JWT  
- **Middleware:** Express-rate-limit, CORS, Morgan, Body-parser  
- **Serverless Deployment:** Vercel-compatible with `serverless-http`

---

## Project Structure

predusk-backend/
│
├─ config/
│ └─ dbConnect.js # MongoDB connection setup
│
├─ controller/
│ └─ profileController.js # Handles profile, skills, and projects
│
├─ middleware/
│ └─ authMiddleware.js # JWT authentication
│
├─ models/
│ └─ User.js # Mongoose user schema
│
├─ routes/
│ ├─ authRoutes.js # Authentication routes
│ └─ profileRoutes.js # Profile routes
│
├─ .env # Environment variables
├─ index.js # Express app 
└─ package.json

## Installation

1. Clone the repository:

```bash
git clone https://github.com/<username>/predusk-backend.git
cd predusk-backend