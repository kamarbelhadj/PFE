import {
  SEARCH_DOCTOR_REQUEST,
  SEARCH_DOCTOR_SUCCESS,
  SEARCH_DOCTOR_FAILURE,
  CLEAR_DOCTOR,
} from "../types";
const initialState = {
  medecin: null,
  error: null,
  isLoading: false,
};
const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_DOCTOR_REQUEST:
      return {
        isLoading: true,
        medecin: null,
        error: null,
      };
    case SEARCH_DOCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        medecin: action.payload,
      };
    case SEARCH_DOCTOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_DOCTOR:
      return {
        ...state,
        medecin: null,
        error: null,
      };
      default:
      return state;
  
  }
};
export default doctorReducer;
