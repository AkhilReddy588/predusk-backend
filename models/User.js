const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  education: [String],
  skills: [String],
  projects: [
    {
      title: String,
      description: String,
      links: [String],
      skillsUsed: [String]
    },
  ],
  work: [String],
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
  },
});

module.exports = mongoose.model('User', userSchema)