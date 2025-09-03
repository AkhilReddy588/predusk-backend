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
  max: 100,                 // limit each IP to 100 requests per window
  message: { message: "Too many requests, please try again later." }
});

app.use(limiter);

module.exports.handler = serverless(app);
