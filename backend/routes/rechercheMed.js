import express from "express";
import Medecin from '../models/Medecin.js';

const rech = express.Router();
rech.get('/all', async (req, res) => {
    try {
      const doctors = await Medecin.find({}, { Nom: 1, Prenom: 1, Specialite: 1 });
  
      res.json({ success: true, doctors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
rech.get('/', async (req, res) => {
    const { NomPrenom } = req.query;
    
    if (!NomPrenom) {
        return res.json({ success: false, message: "Requête de recherche invalide" });
    }
    const [Nom, Prenom] = NomPrenom.split(' '); 

    try {
        const medecin = await Medecin.findOne({
            Nom: { $regex: new RegExp(`^${Nom}$`, 'i') },
            Prenom: { $regex: new RegExp(`^${Prenom}$`, 'i') },
        });

        if (medecin) {
            return res.json({ success: true, medecin });
        } else {
            res.json({ success: false, message: "Médecin introuvable" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default rech;
