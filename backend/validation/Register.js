import isEmpty from "./isEmpty.js";
import validator from 'validator';


function ValidateRegister(data){
    let errors={};

    data.Nom =!isEmpty(data.Nom)?data.Nom:"";
    data.Prenom =!isEmpty(data.Prenom)?data.Prenom:"";
    data.Email =!isEmpty(data.Email)?data.Email:"";
    data.Gendre =!isEmpty(data.Gendre)?data.Gendre:"";
    data.Password=!isEmpty(data.Password)?data.Password:"";
    data.DateNaissance=!isEmpty(data.DateNaissance)?data.DateNaissance:"";
    // data.ConfirmPassword=!isEmpty(data.ConfirmPassword)?data.ConfirmPassword:"";
    

    if(validator.isEmpty(data.Nom)){
        errors.Nom='required nom'
    }

    if(validator.isEmpty(data.Prenom)){
       
        errors.Prenom='required Prenom'
    }
    if(!validator.isEmail(data.Email)){
        errors.Email='Required format email'
    }
    
    if(validator.isEmpty(data.Email)){
        errors.Email='required Email'
    }

    if(validator.isEmpty(data.Gendre)){
        errors.Gendre='required Gendre'
    }

    if(validator.isEmpty(data.Password)){
        errors.Password='required Password'
    }

    if(validator.isEmpty(data.DateNaissance)){
        errors.DateNaissance='required DateNaissance'
    }
    
    
    return {
        errors,
        isValid:isEmpty(errors)
    }
};
export default ValidateRegister;