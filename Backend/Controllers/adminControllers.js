const prisma = require("../DB/db.config.js")

const getActiveQueue = async (req, res) => {
    const activeQueue = await prisma.queueEntry.findMany({
        where: { OR: [{ status: 'WAITING' }, { status: 'SERVING' }] },
        orderBy: { createdAt: 'asc' },
    })
    res.json({ status: 200, data: activeQueue })
}

const getDashboardStats = async (req, res) => {
    const stats = {
        waiting: await prisma.queueEntry.count({ where: { status: 'WAITING' } }),
        serving: await prisma.queueEntry.count({ where: { status: 'SERVING' } }),
        completedToday: await prisma.queueEntry.count({ where: { status: 'COMPLETED' } }),
    }
    res.json({ status: 200, data: stats })
}

const callNextEntry = async (req, res) => {
    const nextInLine = await prisma.queueEntry.findFirst({
        where: { status: 'WAITING' },
        orderBy: { createdAt: 'asc' },
    })

    if (!nextInLine) {
        return res.status(404).json({ status: 404, message: 'No customers are waiting.' })
    }

    const nowServing = await prisma.queueEntry.update({
        where: { id: nextInLine.id },
        data: { status: 'SERVING' },
    })

    res.json({ status: 200, data: nowServing, message: `Now serving #${nowServing.daily_token_number} - ${nowServing.name}.` })
}

const completeEntry = async (req, res) => {
    const id = Number(req.params.id)
    const updatedEntry = await prisma.queueEntry.update({
        where: { id },
        data: { status: 'COMPLETED' },
    })
    res.json({ status: 200, data: updatedEntry, message: `Entry #${updatedEntry.daily_token_number} marked as COMPLETED.` })
}

const skipEntry = async (req, res) => {
    const id = Number(req.params.id)
    const updatedEntry = await prisma.queueEntry.update({
        where: { id },
        data: { status: 'SKIPPED' },
    })
    res.json({ status: 200, data: updatedEntry, message: `Entry #${updatedEntry.daily_token_number} marked as SKIPPED.` })
}


module.exports = { 
    getActiveQueue,
    getDashboardStats,
    callNextEntry, 
    completeEntry,
    skipEntry
}