const User = require('../models/User')

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password")
        res.json(user)

    } catch (err){
        res.status(500).json({error: err.message})
    }
}

const updateProfile = async (req, res) => {
    try {
        const updates = req.body
        const user = await User.findByIdAndUpdate(
          req.user.id,
          { $set: updates },
          { new: true }
        ).select("-password")
    
        res.json(user)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

const getProjectBySkill = async (req, res) => {
    try {
    const { skill } = req.query;

    const user = await User.findById(req.user.id).select("projects")

    if(!skill)
    {
        return res.json(user.projects)
    }

    const projects = user.projects.filter(p =>
      p.skillsUsed.some(s => s.toLowerCase() === skill.toLowerCase())
    )

    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getSkills = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("skills")
    res.json({ topSkills: user.skills })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const addSkill = async (req, res) => {
    try {
    const { skill } = req.body;
    if (!skill) return res.status(400).json({ message: "Skill is required" });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { skills: skill } }, 
      { new: true }
    ).select("skills");

    res.json(user.skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const addProject = async (req, res) => {
    try {
    const { title, description, links, skillsUsed } = req.body

    if (!title || !description)
      return res.status(400).json({ message: "Title and description are required" })

    const project = { title, description, links, skillsUsed }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { projects: project } },
      { new: true }
    ).select("projects")

    res.json(user.projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {getProfile, updateProfile, getProjectBySkill, getSkills, addProject, addSkill}