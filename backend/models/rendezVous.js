import mongoose from "mongoose";
const Schema =mongoose.Schema;
const RendezVousSchema=new Schema({
    MedecinId:{
        type:mongoose.Schema.Types.ObjectId,
        
        ref:'Medecin'
    },
    Date: {
        type: Date,
        
      },
    Status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
      },
    Notes: {
        type: String,
        default: ''
      }
},{ timestamps: true });

const RendezVous=mongoose.model('RendezVous',RendezVousSchema);
export default RendezVous ;