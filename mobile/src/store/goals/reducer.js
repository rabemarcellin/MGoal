import { actions } from "./actions"

const initialState = []

const goalReducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.GET_GOALS:
            return action.payload

        case actions.CREATE_GOAL:
            return [...state, action.payload]

        case actions.UPDATE_GOAL_COVER:
            return (
                state.map(goal => {
                if(goal._id === action.payload.id) {
                    return action.payload.updatedGoal
                } else {
                    return goal
                }
            }))

        case actions.DELETE_GOAL:
            return state.filter(goal => goal._id !== action.payload)

        default:
            return state
    }
}

export default goalReducer