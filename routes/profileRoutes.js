const express = require('express')
const {getProfile, updateProfile, getProjectBySkill, getSkills, addProject, addSkill} = require('../controller/profileController')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', auth, getProfile)
router.put('/', auth, updateProfile) 
router.get('/projects', auth, getProjectBySkill) 
router.get('/skills', auth, getSkills) 
router.patch("/skills", auth, addSkill)
router.patch("/projects", auth, addProject)

router.get("/test", (req, res) => {
  console.log("✅ Test route hit");
  res.json({ message: "Server is working fine" });
});

module.exports = router