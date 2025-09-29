const prisma = require("../DB/db.config.js")

const createQueueEntry = async (req, res) => {
    const { name, phone } = req.body

    if (!name || !phone) {
        return res.status(400).json({ status: 400, message: "Name and phone are required." })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todaysCount = await prisma.queueEntry.count({
        where: { createdAt: { gte: today } },
    })
    const daily_token_number = todaysCount + 1

    const newEntry = await prisma.queueEntry.create({
        data: {
            name:name,
            phone:phone,
            daily_token_number: daily_token_number,
        },
    })
    res.status(201).json({ status: 201, data: newEntry, message: 'Successfully joined the queue.' })
}


const getNowServingByCount = async (req, res) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) 

    const processedCount = await prisma.queueEntry.count({
        where: {
            createdAt: { gte: today },
            OR: [
                { status: 'COMPLETED' },
                { status: 'SKIPPED' },
            ],
        },
    })

    const nowServingNumber = processedCount + 1
    res.json({ status: 200, data: { current_token_number: nowServingNumber } })
}



const getQueueEntryStatus = async (req, res) => {
    const id = Number(req.params.id)

    const entry = await prisma.queueEntry.findUnique({ where: { id } })

    if (!entry) {
        return res.status(404).json({ status: 404, message: "Queue entry not found." })
    }

    res.json({ status: 200, data: {entry} })
}


module.exports = { createQueueEntry, getNowServingByCount,getQueueEntryStatus}