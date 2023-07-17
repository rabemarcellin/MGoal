const { getGoals, createGoal, updateGoal, deleteGoal, findGoal, addCovers } = require("../models/Goal")
const cloudinary = require("cloudinary").v2
const fs = require('fs');
const path = require('path');

require("dotenv").config()

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET


cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});


// Get
const getGoalsRequest = async (req, res) => {
    const goals = await getGoals()
    if(goals) {
        return res.json(goals)
    }
    res.sendStatus(404)
}


// Create
const createGoalRequest = async (req, res) => {
    const goalData = req.body
    const newGoal = await createGoal(goalData)
    if(newGoal) {
        return res.status(201).json(newGoal)
    }
    res.sendStatus(401)
}

// Update
const updateGoalRequest = async (req, res) => {
    const { id } = req.params
    const newGoalData = req.body
    const updatedGoal = await updateGoal(id, newGoalData)
    if(updatedGoal) {
        return res.json(updatedGoal)
    }
    res.sendStatus(401)
}

const addCoversRequest = async (req, res) => {
    const { id } = req.params
    const newCovers = req.body.coverUrl
    const updatedGoal = await addCovers(id, newCovers)
    if(updatedGoal) {
        return res.json(updatedGoal)
    }
    res.sendStatus(401)
}


const uploadCoverRequest = async (req, res) => {
    if(!req.file) {
        return res.sendStatus(400)
    }

    try {
        const tempDir = 'temp';
        const tempFilePath = path.join(tempDir, req.file.originalname);
    
        // Create the temporary directory if it doesn't exist   
        if(!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }
        
        fs.writeFileSync(tempFilePath, req.file.buffer);

        const result = await cloudinary.uploader.upload(tempFilePath, {
            folder: "cover(s)", 
        });
        const coverUrl = result.secure_url;
        if(coverUrl) {
            return res.send(coverUrl)
        }
        res.sendStatus(401)
    } catch(err) {
        console.log(err)
        return res.sendStatus(500)
    }
}


// Delete
const deleteGoalRequest = async (req, res) => {
    const { id } = req.params
    const removedGoal = await deleteGoal(id)
    if(removedGoal) {
        return res.sendStatus(200)
    }
    res.sendStatus(401)
}

module.exports = { 
    getGoalsRequest, 
    createGoalRequest, 
    updateGoalRequest,
    uploadCoverRequest,
    addCoversRequest,
    deleteGoalRequest
}