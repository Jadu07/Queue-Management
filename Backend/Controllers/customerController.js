const prisma = require("../DB/db.config.js")

const createQueueEntry = async (req, res) => {
    const name = req.body.name
    const phone = req.body.phone
    const businessId = req.params.businessId ? Number(req.params.businessId) : (req.body.businessId ? Number(req.body.businessId) : undefined)

    if (!name || !phone) {
        return res.status(400).json({ status: 400, message: 'Name and phone are required.' })
    }

    let business = null
    if (businessId) {
        business = await prisma.business.findUnique({ where: { id: businessId } })
        if (!business) return res.status(404).json({ status: 404, message: 'Invalid business id' })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const countWhere = { createdAt: { gte: today } }
    if (business) countWhere.businessId = business.id

    const todaysCount = await prisma.queueEntry.count({ where: countWhere })
    const dailyTokenNumber = todaysCount + 1

    const createData = {
        name,
        phone,
        daily_token_number: dailyTokenNumber,
    }
    if (business) createData.business = { connect: { id: business.id } }

    const newEntry = await prisma.queueEntry.create({ data: createData })
    return res.status(201).json({ status: 201, data: newEntry, message: 'Successfully joined the queue.' })
}



const getNowServingByCount = async (req, res) => {
    const businessId = req.params.businessId ? Number(req.params.businessId) : (req.query.businessId ? Number(req.query.businessId) : undefined)

    let business = null
    if (businessId) {
        business = await prisma.business.findUnique({ where: { id: businessId } })
        if (!business) return res.status(404).json({ status: 404, message: 'Invalid business id' })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const countWhere = {
        createdAt: { gte: today },
        OR: [{ status: 'COMPLETED' }, { status: 'SKIPPED' }, { status: 'SERVING' }]
    }
    if (business) countWhere.businessId = business.id

    const processedCount = await prisma.queueEntry.count({ where: countWhere })
    const nowServingNumber = processedCount
    return res.json({ status: 200, data: { current_token_number: nowServingNumber } })
}



const getQueueEntryStatus = async (req, res) => {
    const id = Number(req.params.id)
    const entry = await prisma.queueEntry.findUnique({ where: { id } })
    if (!entry) return res.status(404).json({ status: 404, message: 'Queue entry not found.' })
    return res.json({ status: 200, data: entry })
}

const getBusinessDetails = async (req, res) => {
    const businessId = Number(req.params.businessId)
    const business = await prisma.business.findUnique({ where: { id: businessId } })
    if (!business) return res.status(404).json({ status: 404, message: 'Business not found.' })
    return res.json({ status: 200, data: business })
}

module.exports = { createQueueEntry, getNowServingByCount, getQueueEntryStatus, getBusinessDetails }