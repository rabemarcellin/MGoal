const mongoose = require("mongoose")

const doSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['todo', 'noTodo'],
        required: true
    },
    context: {
        type: String,
        required: true
    },
    explanation: {
        type: String
    },
    accomplished: {
        type: Boolean,
        default: false
    },
    isHelpfull: {
        type: Boolean,
        default: false
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal',
        required: true,
    }
})

const Do = mongoose.model('Do', doSchema)

// Read

const getDo = async (id, constraint = {}) => {
    try {
        return await Do.findOne({
            ...constraint,
            _id: id,
        })
    } catch(err) {
        console.error(err)
        return false
    }
}

const getDosByGoal = async (goalId) => {
    try {
        return await Do.find({goal: goalId})
            .populate('goal')
            .exec()
    } catch(err) {
        console.error(err)
        return false
    }
}


// Create
const createDo = async (newDoData) => {
    try {
        return await Do.create(newDoData)
    } catch(err) {
        console.error(err)
        return false
    }
}


// Update
const updateDo = async(id, newDoData) => {
    console.log(newDoData.accomplished)
    try {
        return await Do.findOneAndUpdate(
            {_id: id},
            newDoData,
            {new: true}
        )
    } catch(err) {
        console.error(err)
        return false
    }
}


// Delete
const deleteDo = async(id) => {
    try {
         return await Do.findByIdAndRemove(id)
    } catch(err) {
        console.error(err)
        return false
    }
}

module.exports = {
    default: Do,
    getDo,
    getDosByGoal,
    createDo,
    updateDo,
    deleteDo
}