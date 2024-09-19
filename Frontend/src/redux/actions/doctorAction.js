import { SEARCH_DOCTOR_REQUEST, SEARCH_DOCTOR_SUCCESS, SEARCH_DOCTOR_FAILURE } from '../types';
import axios from 'axios';

export const searchDoctor = (NomPrenom) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_DOCTOR_REQUEST });
    const response = await axios.get('/recherche', {
      params: {
        NomPrenom
      },
    });
    if (response.data.success) {
      const doctor = response.data.medecin; 
      dispatch({
        type: SEARCH_DOCTOR_SUCCESS,
        payload: doctor,
      });
    } else {
      const message = response.data.message;
      dispatch({
        type: SEARCH_DOCTOR_FAILURE,
        payload: message,
      });
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const errorMessage = error.response.data.message;
      dispatch({
        type: SEARCH_DOCTOR_FAILURE,
        payload: errorMessage,
      });
    } else {
      const errorMessage = 'est produite lors de la recherche du médecin';
      dispatch({
        type: SEARCH_DOCTOR_FAILURE,
        payload: errorMessage,
      });
    }
  }
};

