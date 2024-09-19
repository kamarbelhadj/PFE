import mongoose from "mongoose";
const schema = mongoose.Schema;
const PatientSchema = new schema(
    {
          Nom: {
            type: String,
            
            min: 2,
            max: 50,
          },
          Prenom: {
            type: String,
            
            min: 2,
            max: 50,
          },
          Email: {
            type: String,
            
            max: 50,
            unique: true,
            trim:true,
          },
          Gendre: {
            type: String,
            enum: ['homme', 'femme'],
           
          },
          NumTel:{
            type:Number,

          },
          NumLicenceMed:{
            type:Number,

          },
          Password: {
            type: String,
           
            min: 5,
          },
          DateNaissance:{
            type: Date,
           
          },
          PhotoProfilPath: {
            type: String,
            default: "",
          },
          role: "string",
          Dossier:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Resume',
          }],
          listMedecin:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'medecin'
          }]
          
},{ timestamps: true });

const Patient=mongoose.model('Patient',PatientSchema);
export default Patient;