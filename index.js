const express =require("express")
const app = express()

const {createQueueEntry,getNowServingByCount,getQueueEntryStatus} = require("./Controllers/customerController.js")
app.use(express.json())

const dotenv=require("dotenv")
dotenv.config()

app.post("/",createQueueEntry)
app.get("/serving",getNowServingByCount)
app.get("/:id",getQueueEntryStatus)



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
