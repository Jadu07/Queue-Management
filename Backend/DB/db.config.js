// Adjusted require to point to the generated client in the repo-level DB/generated/prisma
const { PrismaClient } = require("../../DB/generated/prisma")
const prisma = new PrismaClient()
module.exports = prisma

