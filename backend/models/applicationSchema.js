import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide your Name"],
    minLength: [3, "Name must contain at least 3 character"],
    maxLength: [30, "Name can't Exceed 30 character"],
  },
  email: {
    type: String,
    required: [true, "Please Provide your Email"],
    validate: [validator.isEmail, "Please Provide a Valid Email"],
  },
  coverLetter: {
    type: String,
    required: [true, "Please Provide your cover Letter"],
  },
  phone: {
    type: Number,
    required: [true, "Please Provide your Phone Number."],
  },
  address: {
    type: String,
    required: [true, "Please Provide your Address"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
