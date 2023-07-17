const express = require("express")
const multer = require('multer');
const { 
    getGoalsRequest, 
    createGoalRequest, 
    updateGoalRequest,
    deleteGoalRequest, 
    addCoversRequest,
    uploadCoverRequest
} = require("../controllers/goalController")


let storage = multer.memoryStorage()
let upload = multer({ storage: storage });


const goalRouter = express.Router()

// Read
goalRouter.get('/', getGoalsRequest)

// Create
goalRouter.post('/create', createGoalRequest)
goalRouter.post('/cover/upload', upload.single('image'), uploadCoverRequest)

// Update
goalRouter.post('/update/:id', updateGoalRequest)
goalRouter.post('/update/:id/add-covers', addCoversRequest)

// Delete
goalRouter.delete('/delete/:id', deleteGoalRequest)

module.exports = goalRouter