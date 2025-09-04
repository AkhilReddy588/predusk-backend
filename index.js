const express = require('express')
const dbConnect = require('./config/dbConnect')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const rateLimit = require("express-rate-limit")
const { ipKeyGenerator } = require("express-rate-limit");
const morgan = require("morgan")
const cors = require("cors")

dbConnect()

const app = express()
app.set("trust proxy", 1);
app.use(cors({
  origin: ["http://localhost:5173", "https://predusk-frontend.vercel.app"],
  credentials: true 
}))
app.use((req, res, next) => {
  console.log("Request:", req.method, req.url);
  next();
});
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan("dev")) //logging
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://predusk-frontend.vercel.app 'wasm-unsafe-eval' 'inline-speculation-rules';"
  );
  next();
});

app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)
app.get("/api/health", (req, res) => res.send("API is running..."))
app.get("/", (req, res) => {res.send("Backend running")})

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { message: "Too many requests, please try again later." },
  keyGenerator: (req, res) => {
    // IPv6 safe way
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
      return forwarded.split(",")[0]; // first IP in list
    }
    return ipKeyGenerator(req); // ensures IPv6 works correctly
  },
});

app.use(limiter);
const PORT = 3000
app.listen(PORT, () => {console.log('server is running on port 3000')})
