import mongoose from "mongoose";
const Schema = mongoose.Schema;
const MedecinSchema= new Schema(
    {
      Nom: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      Prenom: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      Email: {
        type: String,
        required: true,
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
        require:true 
      },
      Password: {
        type: String,
        required: true,
        min: 5,
      },
      PhotoProfilPath: {
        type: String,
        default: "",
      },
      Specialite:{
        type:String,
      },
     
      Pay:{
        type: String,
      },
      Gouvernorat:{
        type: String
      },
      
     Specification:{
      type:String
     },
       
      Description:{
        type: String
      },
      role: "string",

      NumLicenceMedical:{
        type:String,
        require:true
      },
    
      ListPatient:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
      }],
      ListPatientPending:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
      }]
    },{ timestamps: true });


  const Medecin=mongoose.model('medecin',MedecinSchema);

  export default Medecin;