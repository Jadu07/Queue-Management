const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  if (!authHeader) return res.status(401).json({ status: 401, message: 'Missing Authorization header' })

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader
  if (!token) return res.status(401).json({ status: 401, message: 'Missing token' })

  const secret = process.env.JWT_SECRET
  if (!secret) return res.status(500).json({ status: 500, message: 'JWT secret not configured' })
  const payload = jwt.verify(token, secret)
  req.admin = payload
  next()
}

module.exports = auth
