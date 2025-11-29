const prisma = require("../DB/db.config.js")

const getActiveQueue = async (req, res) => {
    const businessId = req.admin?.businessId
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const where = {
        OR: [{ status: 'WAITING' }, { status: 'SERVING' }],
        createdAt: { gte: today }
    }
    if (businessId) where.businessId = businessId
    const activeQueue = await prisma.queueEntry.findMany({ where, orderBy: { createdAt: 'asc' } })
    res.json({ status: 200, data: activeQueue })
}

const getDashboardStats = async (req, res) => {
    const businessId = req.admin?.businessId
    const baseWhere = businessId ? { businessId } : {}
    const today = new Date(); today.setHours(0, 0, 0, 0)

    // Get the current serving entry to show its token number
    const currentServingEntry = await prisma.queueEntry.findFirst({
        where: { ...baseWhere, status: 'SERVING', createdAt: { gte: today } }
    })

    const stats = {
        waiting: await prisma.queueEntry.count({ where: { ...baseWhere, status: 'WAITING', createdAt: { gte: today } } }),
        serving: currentServingEntry ? currentServingEntry.daily_token_number : 0,
        completedToday: await prisma.queueEntry.count({ where: { ...baseWhere, status: 'COMPLETED', createdAt: { gte: today } } }),
    }
    res.json({ status: 200, data: stats })
}

const callNextEntry = async (req, res) => {
    const businessId = req.admin?.businessId
    const where = businessId ? { status: 'WAITING', businessId } : { status: 'WAITING' }
    const nextInLine = await prisma.queueEntry.findFirst({ where, orderBy: { createdAt: 'asc' } })

    if (!nextInLine) return res.status(404).json({ status: 404, message: 'No customers are waiting.' })

    const nowServing = await prisma.queueEntry.update({ where: { id: nextInLine.id }, data: { status: 'SERVING' } })
    res.json({ status: 200, data: nowServing, message: `Now serving #${nowServing.daily_token_number} - ${nowServing.name}.` })
}

const completeEntry = async (req, res) => {
    const businessId = req.admin?.businessId
    const id = Number(req.params.id)
    const entry = await prisma.queueEntry.findUnique({ where: { id } })
    if (!entry) return res.status(404).json({ status: 404, message: 'Entry not found' })
    if (businessId && entry.businessId !== businessId) return res.status(403).json({ status: 403, message: 'Forbidden' })

    const updatedEntry = await prisma.queueEntry.update({ where: { id }, data: { status: 'COMPLETED' } })
    res.json({ status: 200, data: updatedEntry, message: `Entry #${updatedEntry.daily_token_number} marked as COMPLETED.` })
}

const skipEntry = async (req, res) => {
    const businessId = req.admin?.businessId
    const id = Number(req.params.id)
    const entry = await prisma.queueEntry.findUnique({ where: { id } })
    if (!entry) return res.status(404).json({ status: 404, message: 'Entry not found' })
    if (businessId && entry.businessId !== businessId) return res.status(403).json({ status: 403, message: 'Forbidden' })

    const updatedEntry = await prisma.queueEntry.update({ where: { id }, data: { status: 'SKIPPED' } })
    res.json({ status: 200, data: updatedEntry, message: `Entry #${updatedEntry.daily_token_number} marked as SKIPPED.` })
}

const getNextEntry = async (req, res) => {
    const businessId = req.admin?.businessId
    const where = businessId ? { status: 'WAITING', businessId } : { status: 'WAITING' }
    const nextEntry = await prisma.queueEntry.findFirst({ where, orderBy: { createdAt: 'asc' } })
    res.json({ status: 200, data: nextEntry })
}

module.exports = {
    getActiveQueue,
    getDashboardStats,
    callNextEntry,
    completeEntry,
    skipEntry,
    getNextEntry
}