const express = require('express')
const dbConnect = require('./config/dbConnect')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const rateLimit = require("express-rate-limit")
const morgan = require("morgan")
const cors = require("cors")
const serverless = require('serverless-http');

dbConnect()

const app = express()
app.set("trust proxy", 1);
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}))
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan("dev")) //logging

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.get("/api/health", (req, res) => res.send("API is running..."))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Too many requests, please try again later." },
  keyGenerator: (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
      return forwarded.split(",")[0]; // use client IP
    }
    return req.ip || "unknown";
  }
});

app.use(limiter);

module.exports = serverless(app);
