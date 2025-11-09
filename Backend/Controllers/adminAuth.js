const prisma = require("../DB/db.config.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerAdmin = async (req, res) => {
  const { email, password, businessName } = req.body
  if (!email || !password || !businessName) {
    return res.status(400).json({ status: 400, message: 'email, password and businessName are required' })
  }

  const business = await prisma.business.create({ data: { name: businessName } })

  const passwordHash = await bcrypt.hash(password, 10)
  const admin = await prisma.admin.create({ data: { email, passwordHash, business: { connect: { id: business.id } } } })

  const secret = process.env.JWT_SECRET
  if (!secret) return res.status(500).json({ status: 500, message: 'JWT secret not configured' })
  const accessToken = jwt.sign({ id: admin.id, email: admin.email, businessId: business.id }, secret, { expiresIn: '7d' })

  return res.status(201).json({ status: 201, data: { admin: { id: admin.id, email: admin.email }, business: { id: business.id, name: business.name }, token: accessToken, joinLink: `/join/${business.id}` } })
}

const loginAdmin = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ status: 400, message: 'email and password required' })

  const admin = await prisma.admin.findUnique({ where: { email } })
  if (!admin) return res.status(401).json({ status: 401, message: 'Invalid credentials' })

  const match = await bcrypt.compare(password, admin.passwordHash)
  if (!match) return res.status(401).json({ status: 401, message: 'Invalid credentials' })

  const secret = process.env.JWT_SECRET
  if (!secret) return res.status(500).json({ status: 500, message: 'JWT secret not configured' })
  const accessToken = jwt.sign({ id: admin.id, email: admin.email, businessId: admin.businessId }, secret, { expiresIn: '7d' })

  return res.json({ status: 200, data: { token: accessToken } })
}

module.exports = { registerAdmin, loginAdmin }
