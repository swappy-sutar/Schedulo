import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      lowercase: true,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "HR"],
      default: "HR",
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    salary: {
      type: Number,
    },
    searchedCandidates: [
      {
        type: Schema.Types.ObjectId,
        ref: "Candidate",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
