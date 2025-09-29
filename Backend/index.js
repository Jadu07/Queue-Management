const express =require("express")
const app = express()

const {createQueueEntry,getNowServingByCount,getQueueEntryStatus} = require("./Controllers/customerController.js")
const {getActiveQueue,getDashboardStats,callNextEntry,completeEntry,skipEntry} = require("./Controllers/adminControllers.js")

app.use(express.json())

const dotenv=require("dotenv")
dotenv.config()

app.post("/",createQueueEntry)
app.get("/serving",getNowServingByCount)
app.get("/:id",getQueueEntryStatus)



app.get('/admin/active', getActiveQueue);
app.get('/admin/stats', getDashboardStats);
app.post('/admin/next', callNextEntry);
app.post('/admin/complete/:id', completeEntry);
app.post('/admin/skip/:id', skipEntry);



const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
