import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
  timeslots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Timeslot",
    },
  ],
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
