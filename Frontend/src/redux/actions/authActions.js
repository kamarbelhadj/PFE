import axios from 'axios';
import { ERRORS, SET_USER } from '../types';
import jwt_decode from 'jwt-decode'
import errorsReducer from '../reducers/errorsReducer';
import { toast } from 'react-toastify';

export const Registration = (form, navigate)=>dispatch=>{
      axios.post('/Patient/register', form) 
      .then(res=>{
         navigate('/login')
         dispatch({
            type: ERRORS,
            payload: {}
        })

      })
      .catch(err=>{
        console.log('form Register Action',form)
          dispatch({
              type: ERRORS,
              payload: err.response.data
          })
      })
}
export const RegistrationMedecin = (form, navigate) => (dispatch) => {
    axios
      .post('/medecin/register', form)
      .then((res) => {
        navigate('/login');
        dispatch({
          type: ERRORS,
          payload: {},
        });
      })
      .catch((err) => {
        console.log('form Register Medecin Action', form);
        dispatch({
          type: ERRORS,
          payload: err.response.data,
        });
      });
  };

  export const LoginAction = (form, navigate) => (dispatch) => {
    axios
      .post('/login', form)
      .then((res) => {
        const token = res.data.token;
        const userCnct = res.data.userConnected;
  
        localStorage.setItem('userCnt', userCnct);
        localStorage.setItem('jwt', token);
        const decodedToken = jwt_decode(token);
        const { role } = decodedToken;
        dispatch(setUser(decodedToken));
  
        if (role === 'patient') {
          navigate('/patient/profile');
        } else if (role === 'medecin') {
          navigate('/medecin/profileMed');
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch({
          type: 'ERRORS', // Replace 'ERRORS' with your actual action type for handling errors
          payload: err.response.data,
        });
      });
  };


export const Logout = ()=>dispatch=>{
    localStorage.removeItem('jwt')
    localStorage.removeItem('userCnt')
    dispatch({
        type: SET_USER,
        payload: {}
    })
}

export const setUser = (decode)=>({
    type: SET_USER,
    payload: {
      role:decode.role,
      Nom:decode.Nom,
      Prenom: decode.Prenom,
      Specialite: decode.Specialite,
      Pay:decode.Pay,
      Gouvernorat:decode.Gouvernorat,
      PhotoProfilPath:decode.PhotoProfilPath

    }
    
})