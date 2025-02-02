import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyLocation: {
      type: String,
      required: true,
      trim: true,
    },
    jobRequirements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobRequirement",
      },
    ],
    hrName: {
      type: String,
      required: true,
      trim: true,
    },
    hrEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    HrPhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    coordinationHr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    requirementFrom: {
      type: String,
      enum: ["Talent Corner", "Jobizza", "Loyal HR", "Other"],
    },
    ConfidentialData: {
      GSTNumber: { type: String, trim: true },
      PaymentTerm: { type: Number }, // in days
      PlacementFeePercentage: { type: Number }, // in %
      ReplacementTerm: { type: Number }, // in days
    },
  },
  {
    timestamps: true,
  }
);

export const Client = mongoose.model("Client", clientSchema);
