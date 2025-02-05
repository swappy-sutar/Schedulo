import mongoose, { Schema } from "mongoose";

const candidateSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    currentJobRole: {
      type: String,
      required: true,
      trim: true,
    },
    currentCompany: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
      },
    ],
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
    noticePeriod: {
      type: String, //in days
    },
    findOn: {
      type: String,
      enum: ["LinkedIn", "naukri", "Indeed", "JobHai", "Other"],
    },
    status: {
      type: String,
      enum: ["Placed", "Rejected", "Hold"],
      default: "Hold",
    },
  },
  {
    timestamps: true,
  }
);

export const Candidate = mongoose.model("Candidate", candidateSchema);
