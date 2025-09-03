const express = require("express")
const { register, login } = require("../controller/authController")

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

router.get("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.json({ message: "Server is working fine" });
});
module.exports = router