import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ResumeSchema = new Schema(
  {
    Medecin: {
      type:String,
      required:true,
    },
    PatientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  
    description: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
    Date:{
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);
const Resume= mongoose.model("Resume", ResumeSchema);
export default Resume;
