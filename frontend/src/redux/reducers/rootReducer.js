
import { combineReducers } from "redux";
import {signInReducer} from './signInReducer'
import { statusReducer } from "./statusReducer";



export const rootReducer = combineReducers({
    statusReducer,
    signInReducer
});