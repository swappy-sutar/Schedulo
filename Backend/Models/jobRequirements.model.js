import mongoose, { Schema } from "mongoose";

const jobRequirementSchema = new Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    salaryRange: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    remark: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const JobRequirement = mongoose.model( "JobRequirement", jobRequirementSchema
);
