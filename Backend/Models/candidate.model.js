import mongoose, { Schema } from "mongoose";

const candidateSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  address:{
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  currentJobRole: {
    type: String,
    required: true,
  },
  currentCompany:{
    type:String,
  },
  experience: {
    type: String,
  },
  skills: [{
      type: String,
    },],
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  currentCTC: {
    type: Number,
  },
  expectedCTC: {
    type: Number,
  },
  NoticePeriod:{
    type:String,
  },
  status: {
    type: String,
    enum: ["placed", "rejected", "hold"],
    default: "hold",
  },
},{
    timestamps: true,
});

export const Candidate = mongoose.model("Candidate", candidateSchema);
