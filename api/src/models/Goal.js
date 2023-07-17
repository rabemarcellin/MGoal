const mongoose = require("mongoose")

const goalSchema = mongoose.Schema({
    context: {
        type: String,
        required: true
    },
    coverUrl: {
        type: [String]
    }
})
const Goal = mongoose.model('Goal', goalSchema)

// Read
const getGoals = async () => {
    try {
        return await Goal.find({})
    } catch(err) {
        return false
    }
}

const findGoal = async (id) => {
    try {
        return await Goal.findOne({_id: id})
    } catch(err) {
        return false
    }
}

// Create
const createGoal = async (goalData) => {
    try {
        return await Goal.create(goalData)
    } catch(err) {
        return false
    }
}


const addCovers = async (id, newCovers) => {
    try {
        const goal = await Goal.findOne({_id: id})
        console.log('goal api', goal)
        const covers = goal.coverUrl ?? []
        return await Goal.findByIdAndUpdate(
            {_id: id},
            {context: goal.context , coverUrl: [...covers, ...newCovers]},
            {new: true}
        )
    } catch(err) {
        console.error(err)
        return false
    }
}
// Update
const updateGoal = async(id, newGoalData) => {
    try {
        return await Goal.findOneAndUpdate(
            {_id: id},
            newGoalData,
            {new: true}
        )
    } catch(err) {
        console.error(err)
        return false
    }
}


// delete
const deleteGoal = async(id) => {
    try {
         return await Goal.findByIdAndRemove(id)
    } catch(err) {
        console.error(err)
        return false
    }
}


module.exports = {
    default: Goal,
    getGoals,
    findGoal,
    createGoal,
    addCovers,
    updateGoal,
    deleteGoal
}