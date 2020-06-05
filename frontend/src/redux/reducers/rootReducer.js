
import { combineReducers } from "redux";
import {signInReducer} from './signInReducer'
import {signUpReducer} from './signUpReducer'

import { statusReducer } from "./statusReducer";



export const rootReducer = combineReducers({
    statusReducer,
    signInReducer,
    signUpReducer
});