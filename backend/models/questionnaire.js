import mongoose from "mongoose";
const Schema = mongoose.Schema;
const QuestionnaireSchema=new Schema({
    Proprietaire:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Medecin'
    },
    Questions: [{
        question: {
          type: String,
          required: true
        },
        Reponse: {
          type: String,
          required: false
        },
        type: {
          type: String,
          enum: ['text', 'radio', 'checkbox'],
        },
        options: [String] // Define options as an array of strings directly
      }],
    RepondeurId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }]

},{ timestamps: true });
const Questionnaire =mongoose.model('Questionnaire',QuestionnaireSchema);

export default Questionnaire;