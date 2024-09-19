import express from "express";
import RegisterMed from "../controllers/RegisterMed.control.js";
import passport from "passport";
import Medecin from "../models/Medecin.js";
import Patient from "../models/patient.js";
import multer from 'multer';
import  fs from "fs";
import mime from 'mime-types';
import Resume from "../models/resume.js";

//import  deletePatient  from '../controllers/MedecinController.js';
import{ uploadImageProfil, uploadDocument,imageDownload, documentDownload } from "../controllers/docController.js";
import { imgUploader, fileUploader} from "../util/uploader.js"
import {updateMedecinPassword, createQuestionnaire }from '../controllers/MedecinController.js';
import Questionnaire from "../models/questionnaire.js";
import Reponse from "../models/ReponseQuest.js";
const routerMed = express.Router();
const upload = multer();


routerMed.post("/", (req, res) => {
  res.send("Bonjour cest medecin Route");
});

/*Registartion medecin*/
routerMed.post("/register", RegisterMed);

/* notification medecin */
routerMed.get(
  "/notification",
  passport.authenticate("jwt", { session: false, role: "medecin" }),
  async (req, res) => {
    try {
      const doctorId = req.user.id;
      const doctor = await Medecin.findById(doctorId);

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      const pendingPatients = doctor.ListPatientPending;
      const patientList = [];

      for (const patientId of pendingPatients) {
        const patient = await Patient.findById(patientId);

        if (patient) {
          const patientDetails = {
            id: patient._id,
            nom: patient.Nom,
            prenom: patient.Prenom,
          };

          patientList.push(patientDetails);
        }
      }

      res.json({ pendingPatients: patientList });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  }
);

/*Accepter demande suivit*/
routerMed.post(
  "/notification/accept-patient",
  passport.authenticate("jwt", { session: false, role: "medecin" }),
  async (req, res) => {
    const patientId = req.body.patientId; // Extract patientId from the request body
    const doctorId = req.user.id;

    const doctor = await Medecin.findById(doctorId);
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    try {
      const medecinId = req.user._id;

      const medecin = await Medecin.findById(medecinId);
      const patient = await Patient.findById(patientId);

      if (!medecin) {
        return res.status(404).json({ message: "Medecin not found" });
      }

      const patientIndex = medecin.ListPatientPending.indexOf(patientId);

      if (patientIndex !== -1) {
        medecin.ListPatientPending.splice(patientIndex, 1);
        medecin.ListPatient.push(patientId);
        patient.listMedecin.push(doctorId);
        await patient.save();
        await medecin.save();
        return res
          .status(200)
          .json({ message: "Patient accepted successfully" });
      } else {
        return res
          .status(404)
          .json({ message: "Patient not found in the pending list" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);



/*Refuser demande suivit*/
routerMed.post(
  "/notification/refuse-patient",
  passport.authenticate("jwt", { session: false, role: "medecin" }),
  async (req, res) => {
    const { patientId } = req.body;

    try {
      const medecinId = req.user._id;

      const medecin = await Medecin.findById(medecinId);

      if (!medecin) {
        return res.status(404).json({ message: "Medecin not found" });
      }

      const patientIndex = medecin.ListPatientPending.indexOf(patientId);

      if (patientIndex !== -1) {
        medecin.ListPatientPending.splice(patientIndex, 1);
        await medecin.save();
        return res
          .status(200)
          .json({
            message: "Patient refused and removed from the pending list",
          });
      } else {
        return res
          .status(404)
          .json({ message: "Patient not found in the pending list" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);



/*list des patient*/
routerMed.get('/patient-list', passport.authenticate("jwt", { session: false, role: "medecin" }), async (req, res) => {
  try {
    const medecinId = req.user.id;
    const medecin = await Medecin.findById(medecinId).select('ListPatient');

    const patientIds = medecin.ListPatient;

    const patientsData = [];

    for (const patientId of patientIds) {
      const patient = await Patient.findById(patientId);

      if (patient) {
        patientsData.push({
          id: patient._id,
          nom: patient.Nom,
          prenom: patient.Prenom,
          dossierMedical: patient.Dossier,
        });
      }
    }

    res.json({ patients: patientsData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/*Dossier View*/
routerMed.get('/patient-list/dossier', passport.authenticate("jwt", { session: false, role: "medecin" }), async (req, res) => {
  try {
    const patientId = req.body.patientId;
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientInfo = {
      nom: patient.Nom,
      prenom: patient.Prenom,
      dossier:patient.Dossier
    };

    res.json({ patientInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});


/*Ajouter photo de profile*/
routerMed.post("/upload/profil", passport.authenticate("jwt", { session: false, role: "medecin" }), imgUploader, async (req, res) => {
  try {
    const medId = req.user.id;
    const medecin = await Medecin.findById(medId);
    if (!medecin) {
      return res.status(404).json({ message: "Medecin not found" });
    }
    const ressource = await uploadImageProfil({ tmpFile: req.file });
    const imageUrl = ressource.fileName; // Extract the URL string from the returned object
    console.log('resource', imageUrl);
    medecin.PhotoProfilPath = imageUrl;
    await medecin.save();
    return res.status(200).json(imageUrl);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
    console.log(error);
  }
});


/*Renvoyer photot de profile*/ 
routerMed.get("/profilPic",passport.authenticate("jwt", { session: false, role: "medecin" }),
  async (req, res) => {
    try {
      const medId = req.user.id;
      const medecin = await Medecin.findById(medId);
      if (!medecin) {
        return res.status(404).json({ message: "Medecin not found" });
      }
        const fileName = medecin.PhotoProfilPath
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


/*Ajouter fichier*/
routerMed.post("/upload/doc", passport.authenticate("jwt", { session: false, role: "medecin" }), fileUploader, async (req, res) => {
  try {
    const date = req.body.date;
    const contentType = req.body.contentType;
    const description = req.body.description;
    const patientId = req.body.patientId;
    const medId = req.user.id;
    const medecin = await Medecin.findById(medId);
    const fullname = `${medecin.Nom} ${medecin.Prenom}`;

    const patient = await Patient.findOne({ _id: patientId });
    if (!patient) {
      throw new Error("Patient not found");
    }

    const ressource = await uploadDocument({
      tmpFile: req.file,
      date,
      contentType,
      description,
      fullname,
      patientId: patient._id
    });

    const newResume = new Resume({
      Medecin: ressource.fullname,
      PatientId: ressource.patientId,
      description: ressource.description,
      path: ressource.fileName,
      contentType: ressource.contentType,
      Date: ressource.date,
    });
    const savedResume = await newResume.save();
    patient.Dossier.push(savedResume._id);
    await patient.save();

    return res.status(200).json(ressource);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
    console.log(error);
  }
});


/*Afficher  Doc*/
routerMed.get("/AfficheDoc/:filename",
    async (req, res) => {
      try {
        const fileName = req.params.filename
        const filePath = await documentDownload({ fileName });
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
        console.log(error)
        res.status(500).json({ message: "An error occurred" });
      }

});
/*Afficher Analyse Doc*/
routerMed.get('/analyseDoc', async (req, res) => {
  try {
    const { patientId } = req.query;
    const patient = await Patient.findById(patientId).populate("Dossier");

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
  
    const analyses = patient.Dossier.filter((resume) => resume.contentType === 'analyse');
    
    res.status(200).json(analyses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
/*Afficher ordanace Doc*/
routerMed.get('/ordDoc', async (req, res) => {
  try {
    const { patientId } = req.query;
    const patient = await Patient.findById(patientId).populate("Dossier");

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
  
    const analyses = patient.Dossier.filter((resume) => resume.contentType === 'ordonnance');
    
    res.status(200).json(analyses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
/*Afficher referance Doc*/
routerMed.get('/refDoc', async (req, res) => {
  try {
    const { patientId } = req.query;
    const patient = await Patient.findById(patientId).populate("Dossier");

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
  
    const analyses = patient.Dossier.filter((resume) => resume.contentType === 'lettreDeReference');
    
    res.status(200).json(analyses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
/*Afficher Rapport Doc*/
routerMed.get('/rapportDoc', async (req, res) => {
  try {
    const { patientId } = req.query;
    const patient = await Patient.findById(patientId).populate("Dossier");

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
  
    const rapports = patient.Dossier.filter((resume) => resume.contentType === 'rapport');
    
    res.status(200).json(rapports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
/* Afficher information du medecin*/
routerMed.get('/userInfo', passport.authenticate("jwt", { session: false, role: "medecin" }), async (req, res) => {
  try {
    const medId = req.user.id;
    const medecin = await Medecin.findById(medId);

    if (!medecin) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    const userInfo = {
      Nom: medecin.Nom,
      Prenom: medecin.Prenom,
      email: medecin.Email,
      Pay: medecin.Pay,
      Gouvernorat: medecin.Gouvernorat,
      NumTel: medecin.NumTel,
      Specification:medecin.Specification,
      Description:medecin.Description,
      Specialite:medecin.Specialite
    };
    res.json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve doctor information" });
  }
});

/* Modifier information personnel du medecin*/
routerMed.patch("/updatePersonnel", passport.authenticate("jwt", { session: false, role: "medecin" }), async (req, res) => {
  const medId = req.user.id;
  const { nom, prenom, email, pay, gouvernorat, numtel } = req.body;

  const data = {
    nom,
    prenom,
    email,
    pay,
    gouvernorat,
    numtel
  };
  try {
    const medecin = await Medecin.findById(medId);
    if (!medecin) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (data.nom) medecin.Nom = data.nom;
    if (data.prenom) medecin.Prenom = data.prenom;
    if (data.email) medecin.Email = data.email;
    if (data.pay) medecin.Pay = data.pay;
    if (data.gouvernorat) medecin.Gouvernorat = data.gouvernorat;
    if (data.numtel) medecin.NumTel = data.numtel;

    medecin.markModified('Nom');
    medecin.markModified('Prenom');
    medecin.markModified('Email');
    medecin.markModified('NumTel');
    medecin.markModified('Pay');
    medecin.markModified('Gouvernorat');

    const updatedMedecin = await medecin.save();
    const { password, ...connectedUser } = updatedMedecin.toObject();

    res.json(connectedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

});

/* Modifier information profetionnel du medecin*/
routerMed.patch("/updatePro", passport.authenticate("jwt", { session: false, role: "medecin" }), async (req, res) => {
  const medId = req.user.id;
  const { specification, specialite, description } = req.body;

  const data = {
    specification,
    specialite,
    description
  };
  try {
    const medecin = await Medecin.findById(medId);
    if (!medecin) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (data.specialite) medecin.Specialite = data.specialite;
    if (data.specification) medecin.Specification = data.specification;
    if (data.description) medecin.Description = data.description;

    medecin.markModified('Specialite');
    medecin.markModified('Specification');
    medecin.markModified('Description');
  

    const updatedMedecin = await medecin.save();
    const { password, ...connectedUser } = updatedMedecin.toObject();

    res.json(connectedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }


});
/* Modifier mot de passe */
routerMed.patch('/updatePassword', passport.authenticate("jwt", { session: false, role: "medecin" }), async (req, res) => {
  try {
    const medId = req.user.id;
    const { newPassword, currentPassword } = req.body; // Corrected destructuring
    
    const connectedUser = await updateMedecinPassword({ medId, newPassword, currentPassword });
    res.status(200).json(connectedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});

/* Creation de questionnaire */

routerMed.post('/questionnaire',  passport.authenticate("jwt", { session: false, role: "medecin" }), async(req,res)=>{
  try {
    const medId = req.user.id;
    const questions= req.body
    const medecin = Medecin.findById(medId)
    if(!medecin) res.status(404).json({ message: "doctor not found" });
    const questionnaireExist = await Questionnaire.findOne({Proprietaire: medId})
    if(questionnaireExist) res.status(200).json(questionnaireExist)
    const questionnaire = await new Questionnaire({
      Proprietaire:medId,
      Questions: [...questions]
    })
    const createdQuest = await questionnaire.save()

    res.status(200).json(createdQuest);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});
routerMed.patch('/questionnaire',  passport.authenticate("jwt", { session: false, role: "medecin" }), async(req,res)=>{
  try {
    const medId = req.user.id;
    const questions= req.body
    const medecin = Medecin.findById(medId)
    if(!medecin) res.status(404).json({ message: "doctor not found" });
    const questionnaireExist = await Questionnaire.findOne({Proprietaire: medId})
    if(!questionnaireExist) {
      const questionnaire = await new Questionnaire({
        Proprietaire:medId,
        Questions: [...questions]

      })
      const createdQuest = await questionnaire.save()
      res.status(200).json(createdQuest);
    }
    questionnaireExist.Questions = questions
    const updatedQuestionnaire = await questionnaireExist.save()
    res.status(201).json(updatedQuestionnaire)


  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
});
/* get questionnaire */
routerMed.get('/questionnaire',  passport.authenticate("jwt", { session: false, role: "medecin" }),async(req,res)=>{
  try {
    let questions = []
    const medId = req.user.id;
    const medecin = await Medecin.findById(medId)
    if(!medecin) res.status(404).json({ message: "doctor not found" });
    const questionnaire = await Questionnaire.findOne({Proprietaire: medId})
    if(questionnaire) {
      questions = questionnaire
      res.status(200).json(questions);
    }
 
  
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error)
  }
});
routerMed.get('/questionnaire/reponse/:id', passport.authenticate("jwt", { session: false, role: "medecin" }), async (req, res) => {
  try {
    const patientId = req.params.id;
    const medecinId = req.user.id;
    const reponse = await Reponse.findOne({ Medecin: medecinId, PatientId: patientId });
    if (!reponse) {
      return res.status(200).json({reponses: []});
    }
    res.status(200).json(reponse);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});






export default routerMed;
