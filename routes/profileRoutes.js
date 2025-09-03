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

module.exports = router