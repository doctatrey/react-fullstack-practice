require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const signup = async (req, res) => {
    const {username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const newUser = new User({ username, email, password })
        await newUser.save()
        
        res.status(200).json({ message: "User created Successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { signup, login, getUser }