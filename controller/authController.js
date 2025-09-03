const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        let existing = await User.findOne({ email })

        if (existing) {
            if (existing) return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            education: [],
            skills: [],
            projects: [],
            work: [],
            links: {},
        });

        await user.save();
        res.status(201).json({ message: "User registered", user: { id: user._id, email: user.email } })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).json({ message: 'Enter both email and password' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.json({ token })


    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { register, login }
