import Patient from '../models/patient.js';
import validateRegister from '../validation/Register.js'
import bcrypt from 'bcrypt';
           

const Register = async(req,res) =>{
    console.log(req.body)
    const {errors, isValid}=validateRegister(req.body);
    console.log(isValid)
    try{
        if(!isValid){
            res.status(404).json(errors);
        }else{
            Patient.findOne({Email:req.body.Email})
            .then( async(exist)=>{
                if (exist){
                    errors.Email="user exist";
                    res.status(404).json(errors);

                }
                else{
                    const hash = bcrypt.hashSync(req.body.Password,10);//hased password
                    req.body.Password=hash;
                    req.body.role = "patient";
                    await Patient.create(req.body);
                    res.status(200).json({message:"succesful"});
                }
            })
        }
       
    }catch (error){
        res.status(404).json(error.message);
    }
}
export default Register;