const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(403).json({ message: "Token is required" })

    try {
        const verified = jwt.verify(token, JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = authenticate
