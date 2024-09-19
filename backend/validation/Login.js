import isEmpty from "./isEmpty.js";
import validator from 'validator';


function ValidateLogin(data){
    let errors={};
    data.Email =!isEmpty(data.Email)?data.Email:"";
    data.Password=!isEmpty(data.Password)?data.Password:"";

    if(!validator.isEmail(data.Email)){
        errors.Email='Required format email'
    }
    
    if(validator.isEmpty(data.Email)){
        errors.Email='required Email'
    }

    if(validator.isEmpty(data.Password)){
        errors.Password='required Password'
    }
    
    return {
        errors,
        isValid:isEmpty(errors)
    }
};
export default ValidateLogin;