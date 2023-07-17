const express = require("express")
const { 
    createDoRequest, 
    getDosByGoalRequest, 
    updateDoRequest, 
    removeExplanation,
    deleteDoRequest,
} = require("../controllers/doController")

const doRouter = express.Router()

// Read
doRouter.get('/:id', getDosByGoalRequest)

// Create
doRouter.post('/create/', createDoRequest)

// Update
doRouter.post('/update/:id', updateDoRequest)

// Delete
doRouter.post('/remove-explanation/:id', removeExplanation)
doRouter.delete('/delete/:id', deleteDoRequest)

module.exports = doRouter