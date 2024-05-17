import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Provide job title"],
    minLength: [3, "Job Title Must Contain Atleast 3 character."],
    maxLength: [50, "Job title can't exceed 50 character."],
  },
  description: {
    type: String,
    required: [true, "Please Provide job Description."],
    minLength: [30, "Job Description Must Contain Atleast 30 character."],
    maxLength: [350, "Job Description can't exceed 350 character."],
  },
  category: {
    type: String,
    required: [true, "Job Category is Required!"],
  },
  country: {
    type: String,
    required: [true, "Job Country is Required!"],
  },
  city: {
    type: String,
    required: [true, "Job City is Required!"],
  },
  location: {
    type: String,
    required: [true, "Please Provide exact location"],
    minLength: [10, "Job location must contain at least 10 character"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "Fixed Salary must contain at least 4 digits."],
    maxLength: [9, "Fixed Salary can't exceed 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "Salary From must contain at least 4 digits."],
    maxLength: [9, "Salary From can't exceed 9 digits"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "salaryTo must contain at least 4 digits."],
    maxLength: [9, "salaryTo can't exceed 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now(),
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
