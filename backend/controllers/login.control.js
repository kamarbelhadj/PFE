import Medecin from '../models/Medecin.js';
import Patient from '../models/patient.js';
import ValidateLogin from '../validation/Login.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const Login = async (req, res) => {
    const { errors, isValid } = ValidateLogin(req.body);
    try {
      if (!isValid) {
        return res.status(404).json(errors);
      }
  
      const patient = await Patient.findOne({ Email: req.body.Email });
      if (patient) {
        const isMatch = await bcrypt.compare(req.body.Password, patient.Password);
        if (isMatch) {
          
          const token = jwt.sign(
            {
              id: patient._id,
              Nom: patient.Nom,
              Email: patient.Email,
              role : patient.role
            },
            process.env.PRIVATE_KEY,
            { expiresIn: '24h' }
          );
          // console.log('Generated token:', token)
          const {Password,...connectedUser}= patient.toObject()
         
          return res.status(200).json({
            message: 'success',
            token: 'Bearer ' + token,
            role: 'patient',
            userConnected: connectedUser
          });
          
        } else {
          return res.status(404).json({ message: 'incorrect password' });
        }
      }
  
      const medecin = await Medecin.findOne({ Email: req.body.Email });
      if (medecin) {
        const isMatch = await bcrypt.compare(req.body.Password, medecin.Password);
        if (isMatch) {
          const token = jwt.sign(
            {
              id: medecin._id,
              Nom: medecin.Nom,
              Prenom :medecin.Prenom,
              Specialite:medecin.Specialite,
              Email: medecin.Email,
              Pay:medecin.Pay,
              Gouvernorat:medecin.Gouvernorat,
              role:medecin.role ,
              PhotoProfilPath:medecin.PhotoProfilPath
            },
            process.env.PRIVATE_KEY,
            { expiresIn: '24h' }
          );
          return res.status(200).json({
            message: 'success',
            token: "Bearer " + token,
            roel:'medecin'
          });
        } else {
          return res.status(404).json({ message: 'incorrect password' });
        }
      }
  
      // If the user is not found in any collection, return an error message
      return res.status(404).json({ message: 'user not found' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
  
  export default Login;
  