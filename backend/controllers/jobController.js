import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJob = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });

  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this resources!!",
        400
      )
    );
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please Provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please Provide either fixedSalary or ranged Salary",
        400
      )
    );
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler(
        "Cannot enter fixed salary and ranged Salary together!",
        400
      )
    );
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });

  res.status(200).json({
    success: true,
    message: "Job Post Successfully!",
    job,
  });
});

export const getmyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this resources!!",
        400
      )
    );
  }

  const myjobs = await Job.find({ postedBy: req.user._id });

  res.status(200).json({
    success: true,
    myjobs,
  });
});

export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this resources!!",
        400
      )
    );
  }

  const { id } = req.params;

  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops! Job not Found!", 404));
  }

  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Job Update Successfully!",
    job,
  });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        "Job Seeker is not allowed to access this resources!!",
        400
      )
    );
  }

  const { id } = req.params;

  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops! Job not Found!", 404));
  }

  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Delete job Successfully!!",
  });
});

export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not Found", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler("Invalid Id / Cast Error", 404));
  }
});
