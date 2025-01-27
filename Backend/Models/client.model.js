import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    hrDetails: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    requirementFrom: {
      type: String,
      enum: ["Talent Corner", "Jobizza", "Loyal HR", "Other"],
    },
    ConfidentialData: {
      GSTNumber: {
        type: String,
        trim: true,
      },
      PaymentTerm: {
        type: Number, // in days
      },
      PlacementFeePercentage: {
        type: Number,  // in %
      },
      ReplacementTerm: {
        type: Number, // in days
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Client = mongoose.model("Client", clientSchema);
