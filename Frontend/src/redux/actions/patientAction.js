import { SEND_FOLLOW_UP_REQUEST_SUCCESS, SEND_FOLLOW_UP_REQUEST_FAILURE} from '../types';
import axios from 'axios';

export const sendFollowUpRequest = (doctorId) => async (dispatch) => {
    try {
      const response = await axios.post("/patient/demandes-de-suivi", { doctorId });
      if (response.data.success)
      {
        dispatch({ type: SEND_FOLLOW_UP_REQUEST_SUCCESS });
        console.log(response.data);

      }
      
    } catch (error) {
      dispatch({
        type: SEND_FOLLOW_UP_REQUEST_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
  