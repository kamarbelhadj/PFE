
import Medecin from "../models/Medecin.js";
import Patient from "../models/patient.js";
import bcrypt from 'bcrypt';
import Questionnaire from "../models/questionnaire.js";


// update profil info 
const updateMedecininfoPersonnel = async ({ medId, data }) => {
    try {
      const medecin = await Medecin.findById(medId);
      if (!medecin) {
        throw new Error("medecin not found");
      } else {
        medecin.Nom = data.Nom;
        medecin.Prenom = data.Prenom;
        medecin.Email = data.Email;
        medecin.NumTel = data.NumTel;
        medecin.Pay = data.pay;
        medecin.Gouvernorat = data.Gouvernorat;
        const updatedMedecin = await medecin.save();
        const { Password, ...connectedUser } = updatedMedecin.toObject();
        return connectedUser;
      }
    } catch (error) {
      throw new Error("Server error");
    }
  };
  


//update password medecin
const updateMedecinPassword = async ({ medId, currentPassword, newPassword }) => {
  try {
    const medecin = await Medecin.findById(medId);
    if (!medecin) {
      throw new Error("Medecin not found");
    }

    const isPasswordValid = bcrypt.compareSync(currentPassword, medecin.Password);
    if (!isPasswordValid) {
      throw new Error("Incorrect current password");
    }

    const hash = bcrypt.hashSync(newPassword, 10);
    medecin.Password = hash;
    const updatedMed = await medecin.save();
    const { Password, ...connectedUser } = updatedMed.toObject();
    return connectedUser;
  } catch (error) {
    throw error;
  }
};

//update password patient
const updatePatientPassword = async ({ patientId, currentPassword, newPassword }) => {
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error("patient not found");
    }

    const isPasswordValid = bcrypt.compareSync(currentPassword, patient.Password);
    if (!isPasswordValid) {
      throw new Error("Incorrect current password");
    }

    const hash = bcrypt.hashSync(newPassword, 10);
    patient.Password = hash;
    const updatedMed = await patient.save();
    const { Password, ...connectedUser } = updatedMed.toObject();
    return connectedUser;
  } catch (error) {
    throw error;
  }
};

//remove patient 
const deletePatient = async ({medId,patientId})=>{
    const medecin = await Medecin.findById(medId)
    if(!medecin) throw new Error({message: "medecin not found" }) 
    const patient = await Patient.findById(patientId)
    if(!patient) throw new Error({message: "patient not found" }) 
    const listPatient = medecin.listPatient.filter( p =>{
        p !== patientId 
    })
    medecin.listPatient = listPatient
    const updatedMed =await  medecin.save()
    const {Password,...connectedUser}= updatedMed.toObject()
    return connectedUser
};
// creation Questionnaire

const createQuestionnaire = async ({medId, questions})=>{
  const newQuestionnaire = new Questionnaire({
    Proprietaire: medId,
    Questions: questions
  })
  await newQuestionnaire.save()
  return newQuestionnaire.toObject()

}
// creation Questionnaire

const updateQuestionnaire = async ({medId, questions})=>{
  const updatedQuestionnaire = Questionnaire.findOne({Proprietaire: medId})
  updatedQuestionnaire.Questions = questions;

  await updatedQuestionnaire.save()
  return updatedQuestionnaire.toObject()

}
export { updateMedecininfoPersonnel,
         updateMedecinPassword, 
         deletePatient,
         updatePatientPassword,
         createQuestionnaire,
         updateQuestionnaire};