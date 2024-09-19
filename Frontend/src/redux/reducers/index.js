import { combineReducers } from "redux";

import authReducer from './authReduce.js'
import errorsReducer from './errorsReducer.js'
import patientReducer from './patientReducer.js'
import doctorReducer from './doctorReducer';
export default combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    doctor: doctorReducer,
    patient:patientReducer
})