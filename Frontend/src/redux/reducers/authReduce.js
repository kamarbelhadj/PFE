import isEmpty from "../../util/isEmpty";
import { SET_USER } from "../types.js";

const initialState = {
  isConnected: false,
  user: {
    role:'',
    Nom:'',
    Prenom:'',
    Specialite:'',
    PhotoProfilPath:''
  },
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { 
        ...state,
        isConnected: !isEmpty(action.payload),
        user: action.payload,
      };
      

    default:
      return state;
  }
}