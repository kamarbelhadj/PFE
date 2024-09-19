import express from "express";
import Register from "../controllers/Register.control.js";
import Medecin from "../models/Medecin.js";
import Questionnaire from "../models/questionnaire.js";
import passport from "passport";
import{ uploadImageProfil, uploadDocument,imageDownload, documentDownload } from "../controllers/docController.js";
import { imgUploader, fileUploader} from "../util/uploader.js"
import Patient from "../models/patient.js";
import Reponse from "../models/ReponseQuest.js";
import multer from 'multer';
import  fs from "fs";
import mime from 'mime-types';

const router = express.Router();

router.post("/", (req, res) => {
  res.send("Bonjour c'est patient Route");
});

/* Registration Patient */
router.post("/register", Register);

/* Profile Patient */
router.get('/profile', passport.authenticate("jwt", { session: false, role: 'patient' }), async (req, res) => {
  try {
    const patientId = req.user.id;
    res.send("Bonjour monsieur");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

/* Demandes de suivi */
router.post("/demandes-de-suivi", passport.authenticate("jwt", { session: false}), async (req, res) => {
  try {
    const patientId = req.user.id;
    const { doctorId } = req.body;
    console.log(req.body);
    const doctor = await Medecin.findById(doctorId);
    if (!doctor) {
      throw new Error("Médecin introuvable");
    }
    if (doctor.ListPatientPending.includes(patientId)) {
      return res.json({ success: false, message: "La demande de suivi a déjà été envoyée" });
    }
    doctor.ListPatientPending.push(patientId);
    await doctor.save();
    res.json({ success: true, message: "Demande de suivi envoyée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Une erreur s'est produite" });
  }
});

/*list des patient*/
router.get('/medecins-list', passport.authenticate("jwt", { session: false, role: "patient" }), async (req, res) => {
  try {
    const patientId = req.user.id;
    const patient = await Patient.findOne({ _id: patientId }).populate("listMedecin");
    if (!patient) {
      return res.status(404).send('Patient not found');
    }
    const listMedecins = patient.listMedecin.map(med =>{
      return {
        id: med._id,
        Nom: med.Nom,
        Prenom: med.Prenom,
        Email: med.Email,
        Gendre: med.Gendre,
        NumTel: med.NumTel,
        PhotoProfilPath: med.PhotoProfilPath,
        Specialite: med.Specialite,
        Pay: med.Pay
      }
    });
    // console.log('Patient found', patient);
    res.status(200).json(listMedecins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


/*get questoionnaire par medecin  */
router.get('/questionnaire/:id',passport.authenticate("jwt", { session: false}), async (req,res)=>{
try {
  const doctorId = req.params.id;
  const doctor = await Medecin.findById(doctorId);
  if (!doctor) {
    res.status(404).json({message:"medecin n'existe pas"})
  }
  const questionnaire = await Questionnaire.findOne({Proprietaire: doctorId})
  if(!questionnaire) {
    res.status(404).json({message: "questionnaire n'existe pas"})
  }
  res.status(200).json(questionnaire)

  
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: "Une erreur s'est produite" });
}

});
/*Ajouter photo de profile*/
router.post("/upload/profil", passport.authenticate("jwt", { session: false, role: "patient" }), imgUploader, async (req, res) => {
  try {
    const patientId = req.user.id;
    const patient = await Medecin.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }
    const ressource = await uploadImageProfil({ tmpFile: req.file });
    const imageUrl = ressource.fileName; // Extract the URL string from the returned object
    patient.PhotoProfilPath = imageUrl;
    await patient.save();
    return res.status(200).json(imageUrl);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
    console.log(error);
  }
});

/* Afficher information du patient*/
router.get('/userInfo', passport.authenticate("jwt", { session: false, role: "patient" }), async (req, res) => {
  try {
    const patientId = req.user.id;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "patient not found" });
    }
    const userInfo = {
      Nom: patient.Nom,
      Prenom: patient.Prenom,
      email: patient.Email,
      Gender: patient.Gender,
      NumTel: patient.NumTel,
      DateNaissance:patient.DateNaissance,
    };
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor information" });
  }
});
/*Renvoyer photot de profile*/ 
router.get("/profilPic",passport.authenticate("jwt", { session: false, role: "patient" }),
  async (req, res) => {
    try {
      const patientId = req.user.id;
      const patient = await Patient.findById(patientId);
      if (!patient) {
        return res.status(404).json({ message: "patient not found" });
      }
        const fileName = patient.PhotoProfilPath
        const filePath = await imageDownload({ fileName });
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');

        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
          return res.status(404).json({ message: "File not found" });
        }

        const mimeType = mime.contentType(filePath);
        if (!mimeType) {
          return res.status(400).json({ message: "Invalid file type" });
        }
        res.type(mimeType);
      
        res.sendFile(filePath, (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
          }
        });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
});

/*Renvoyer dossier*/
router.get('/afficherDossier/:contentType', passport.authenticate("jwt", { session: false, role: "patient" }), async (req, res) => {
  try {
    const patientId = req.user.id;
    const  contentType = req.params.contentType;
    const patient = await Patient.findById(patientId).populate("Dossier");

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    let resumes;
    console.log(contentType)

    switch (contentType) {
      case 'analyse':
        resumes = patient.Dossier.filter((resume) => resume.contentType === 'analyse');
        break;
      case 'ordonnance':
        resumes = patient.Dossier.filter((resume) => resume.contentType === 'ordonnance');
        break;
      case 'rapport':
        resumes = patient.Dossier.filter((resume) => resume.contentType === 'rapport');
        break;
      case 'lettreDeReference':
        resumes = patient.Dossier.filter((resume) => resume.contentType === 'lettreDeReference');
        break;
      default:
        return res.status(400).json({ message: 'Invalid contentType' });
    }

    res.status(200).json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reponse-questionaire', passport.authenticate("jwt", { session: false, role: "patient" }), async(req,res)=>{
  try {

    const patientId=  req.user.id;
    const medecinId= req.body.medecinId;
    const responses = req.body.reponses;
    const questionaire= req.body.questionnaire;

    const reponseExist = await Reponse.findOne({QuestionnaireId: questionaire, PatientId: patientId})
    if(reponseExist){
      reponseExist.reponses = responses
      reponseExist.QuestionnaireId = questionaire
      await reponseExist.save()
      res.status(201).json(reponseExist)
    }else{
      const reponseQuestionnaire= await new Reponse({
        Medecin: medecinId,
        PatientId: patientId,
        reponses: responses,
        QuestionnaireId: questionaire
      })
      await reponseQuestionnaire.save()
      res.status(200).json(reponseQuestionnaire)
    }
    
  } catch (error) {
    res.status(500).json({message:"serveur error"})
  }
})
router.get('/questionnaire-reponses/:id', passport.authenticate("jwt", { session: false, role: "patient" }), async (req, res) => {
  try {
    const patientId = req.user.id;
    const questionnaireId = req.params.id;

    // Check if the questionnaire exists
    const questionnaire = await Questionnaire.findById(questionnaireId);
    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    // Check if the patient has a response for the questionnaire
    const response = await Reponse.findOne({ QuestionnaireId: questionnaireId, PatientId: patientId });
    console.log(response)
    if (!response) {
      return res.status(200).json({ reponses: [] });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;



