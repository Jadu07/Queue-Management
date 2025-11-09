const prisma = require("../DB/db.config.js")

// Create a new queue entry for a business.
// - Route: POST /join/:businessId  OR  POST /join (with body.businessId)
// - Body: { name, phone }
// - If businessId is provided, the entry is scoped to that business.
// - daily_token_number is computed per-business per-day.
const createQueueEntry = async (req, res) => {
    // Read input
    const name = req.body.name
    const phone = req.body.phone
    const businessId = req.params.businessId ? Number(req.params.businessId) : (req.body.businessId ? Number(req.body.businessId) : undefined)

    // Basic validation
    if (!name || !phone) {
        return res.status(400).json({ status: 400, message: 'Name and phone are required.' })
    }

    // If businessId is provided, verify the business exists.
    let business = null
    if (businessId) {
        business = await prisma.business.findUnique({ where: { id: businessId } })
        if (!business) return res.status(404).json({ status: 404, message: 'Invalid business id' })
    }

    // Compute today's start (00:00) so token numbering resets each day.
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Count how many entries already created today for this business (or globally if no business)
    const countWhere = { createdAt: { gte: today } }
    if (business) countWhere.businessId = business.id

    const todaysCount = await prisma.queueEntry.count({ where: countWhere })
    const dailyTokenNumber = todaysCount + 1

    // Build create payload
    const createData = {
        name,
        phone,
        daily_token_number: dailyTokenNumber,
    }
    if (business) createData.business = { connect: { id: business.id } }

    // Create DB record and return it
    const newEntry = await prisma.queueEntry.create({ data: createData })
    return res.status(201).json({ status: 201, data: newEntry, message: 'Successfully joined the queue.' })
}


// Get the current token number being served for today.
// - Route: GET /serving/:businessId  OR  GET /serving?businessId=1
// Returns { current_token_number }
const getNowServingByCount = async (req, res) => {
    const businessId = req.params.businessId ? Number(req.params.businessId) : (req.query.businessId ? Number(req.query.businessId) : undefined)

    // Validate provided businessId (if any)
    let business = null
    if (businessId) {
        business = await prisma.business.findUnique({ where: { id: businessId } })
        if (!business) return res.status(404).json({ status: 404, message: 'Invalid business id' })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Count entries that are COMPLETED or SKIPPED today (scoped to businessId if provided)
    const countWhere = {
        createdAt: { gte: today },
        OR: [{ status: 'COMPLETED' }, { status: 'SKIPPED' }]
    }
    if (business) countWhere.businessId = business.id

    const processedCount = await prisma.queueEntry.count({ where: countWhere })
    const nowServingNumber = processedCount + 1
    return res.json({ status: 200, data: { current_token_number: nowServingNumber } })
}


// Get a queue entry by id
// - Route: GET /:id
// - Returns the entry record or 404 if not found
const getQueueEntryStatus = async (req, res) => {
    const id = Number(req.params.id)
    const entry = await prisma.queueEntry.findUnique({ where: { id } })
    if (!entry) return res.status(404).json({ status: 404, message: 'Queue entry not found.' })
    return res.json({ status: 200, data: entry })
}


module.exports = { createQueueEntry, getNowServingByCount, getQueueEntryStatus }