import isEmpty from "./isEmpty.js";
import validator from 'validator';


function ValidateRegisterMed(data){
    let errors={};

    data.Nom =!isEmpty(data.Nom)?data.Nom:"";
    data.Prenom =!isEmpty(data.Prenom)?data.Prenom:"";
    data.Email =!isEmpty(data.Email)?data.Email:"";
    data.Password=!isEmpty(data.Password)?data.Password:"";
    data.NumLicenceMedical=!isEmpty(data.NumLicenceMedical)?data.NumLicenceMedical:"";
    data.Specialite=!isEmpty(data.Specialite)?data.Specialite:"";
    data.Gouvernorat=!isEmpty(data.Gouvernorat)?data.Gouvernorat:"";
    data.Pay=!isEmpty(data.Pay)?data.Pay:"";


    if(validator.isEmpty(data.Pay)){
        errors.Pay='required Pay'
    }
    if(validator.isEmpty(data.Gouvernorat)){
        errors.Gouvernorat='required Gouvernorat'
    }
    
    
    if(validator.isEmpty(data.Specialite)){
        errors.Specialite='required Specialite'
    }
   
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

    if(validator.isEmpty(data.Password)){
        errors.Password='required Password'
    }    
   
    if(validator.isEmpty(data.NumLicenceMedical)){
        errors.NumLicenceMedical='required NumLicenceMedical'
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
};
export default ValidateRegisterMed;