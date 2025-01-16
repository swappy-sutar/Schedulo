import mongoose, { Schema } from "mongoose";

const timeslotSchema = new Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    candidateDetails: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      qualification: {
        type: String,
        required: true,
        trim: true,
      },
      experience: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

export const Timeslot = mongoose.model("Timeslot", timeslotSchema);
