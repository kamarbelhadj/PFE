import {
  SEND_FOLLOW_UP_REQUEST_SUCCESS,
  SEND_FOLLOW_UP_REQUEST_FAILURE,
} from "../types";
const initialState = {
  successMessage: null,
  errorMessage: null,
};

const patientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_FOLLOW_UP_REQUEST_SUCCESS:
      return {
        ...state,
        successMessage: "Follow-up request sent successfully",
        errorMessage: null,
      };

    case SEND_FOLLOW_UP_REQUEST_FAILURE:
      return {
        ...state,
        successMessage: null,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default patientReducer;
