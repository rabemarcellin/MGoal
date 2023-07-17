import { createGoalService, deleteGoalService, getGoalsService, updateGoalCoverService } from "../../services/goal"

export const actions = {
    GET_GOALS: "get all goals",
    CREATE_GOAL: "create a new goal",
    UPDATE_GOAL_COVER: "update goal cover",
    DELETE_GOAL: "delete a goal"
}

export const getGoalsAction = () => {
    return async (dispatch) => {
        try {
            const goals = await getGoalsService()
            if(goals) {
                dispatch({type: actions.GET_GOALS, payload: goals })
            }
        } catch(err) {
            return ([])
        }
    }
}

export const createGoalAction = (data) => {
    return async (dispatch) => {
        try {
            const newGoal = await createGoalService(data)
            if(newGoal) {
                dispatch({type: actions.CREATE_GOAL, payload: newGoal})
            }
        } catch(err) {
            console.error(err)
        }
    }
} 

export const updateGoalCoverAction = (id, urisArray) => {
    return async (dispatch) => {
        try {
            const updatedGoal = await updateGoalCoverService(id, urisArray)
            if(updatedGoal) {
                dispatch({type: actions.UPDATE_GOAL_COVER, payload: {id, updatedGoal}})
            }
        } catch(err) {
            console.error(err)
        }
    }
}
export const deleteGoalAction = (id) => {
    return async (dispatch) => {
        try {
            const ok = await deleteGoalService(id)
            if(ok) {
                dispatch({type: actions.DELETE_GOAL, payload: id})
            }
        } catch(err) {
            console.error(err)
        }
    }
}

