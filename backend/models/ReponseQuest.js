import mongoose from "mongoose";
const Schema = mongoose.Schema;
const reponseSchema = new Schema(
  {
    Medecin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medecin",
    },
    PatientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    QuestionnaireId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questionnaire",
    },
    reponses:[{
        question: {
            type: String,
            required: true
        },
        reponse:{
            type: String,
            required: true
        }
    }]
  },
  { timestamps: true }
);
const Reponse= mongoose.model("Reponse", reponseSchema);
export default Reponse;