// Use the installed @prisma/client package. This avoids relying on a checked-in
// "generated/prisma" folder which may not exist on the deploy server unless
// `prisma generate` runs during build.
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
module.exports = prisma

