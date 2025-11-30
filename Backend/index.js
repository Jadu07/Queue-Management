const express = require("express")
const cors = require("cors")

const app = express()

const { createQueueEntry, getNowServingByCount, getQueueEntryStatus, getBusinessDetails } = require("./Controllers/customerController.js")
const { getActiveQueue, getDashboardStats, callNextEntry, completeEntry, skipEntry, getNextEntry, getWaitingList, prioritizeEntry } = require("./Controllers/adminControllers.js")
const { registerAdmin, loginAdmin } = require("./Controllers/adminAuth.js")
const auth = require("./Middleware/auth.js")

app.use(express.json())

const dotenv = require("dotenv")
dotenv.config()

app.use(cors())
app.use(express.json())

// customer-facing, business-specific join link (use numeric business id)
app.post("/join/:businessId", createQueueEntry)
app.get("/serving/:businessId", getNowServingByCount)
app.get("/business/:businessId", getBusinessDetails)
app.get("/:id", getQueueEntryStatus)

// admin auth
app.post('/admin/register', registerAdmin);
app.post('/admin/login', loginAdmin);



app.get('/admin/active', auth, getActiveQueue);
app.get('/admin/stats', auth, getDashboardStats);
app.get('/admin/waiting', auth, getWaitingList);
app.get('/admin/next-entry', auth, getNextEntry);
app.post('/admin/next', auth, callNextEntry);
app.post('/admin/complete/:id', auth, completeEntry);
app.post('/admin/skip/:id', auth, skipEntry);
app.post('/admin/prioritize/:id', auth, prioritizeEntry);



const PORT = process.env.PORT || 4001;

const initCronJobs = require('./cronJobs');
initCronJobs();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
