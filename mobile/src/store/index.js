import { configureStore, combineReducers } from "@reduxjs/toolkit";
import goalReducer from "./goals/reducer";

const store = configureStore({
    reducer: combineReducers({
        goals: goalReducer 
    })
})

export default store