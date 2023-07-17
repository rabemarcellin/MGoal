const { 
    getDo,
    getDosByGoal, 
    createDo, 
    updateDo, 
    deleteDo
} = require("../models/Do")

// Read
const getDosByGoalRequest = async (req, res) => {
    const { id } = req.params
    const dos = await getDosByGoal(id)
    if(dos) {
        return res.json(dos)
    }
    res.sendStatus(404)
}


// Create
const createDoRequest = async (req, res) => {
    const newDoData = req.body
    const newDo = await createDo(newDoData)
    if(newDo) {
        return res.status(201).json(newDo)
    }
    res.sendStatus(401)
} 


// Update
const updateDoRequest = async (req, res) => {
    const { id } = req.params
    const newDoData = req.body
    const updatedDo = await updateDo(id, newDoData)
    if(updatedDo) {
        return res.json(updatedDo)
    }
    res.sendStatus(401)
}

// delete
const removeExplanation = async (req, res) => {
    const { id } = req.params
    const self = getDo(id, {explanation: {$exists: true, $type: 'string'}})
    if(!self) {
        return res.sendStatus(404)
    }
    const newSelf = self
    delete newSelf.explanation
    const doWithoutExplanation = await updateDo(id, newSelf)
    if(doWithoutExplanation) {
        return res.json(doWithoutExplanation)
    }
    res.sendStatus(401)
}

const deleteDoRequest = async (req, res) => {
    const { id } = req.params
    const removedGoal = await deleteDo(id)
    if(removedGoal) {
        return res.sendStatus(200)
    }
    res.sendStatus(401)
}


module.exports = { 
    getDosByGoalRequest, 
    createDoRequest, 
    updateDoRequest, 
    removeExplanation,
    deleteDoRequest

}