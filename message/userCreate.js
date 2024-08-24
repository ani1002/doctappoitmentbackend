import express from "express";
//import { generateToken } from "../utils/jwtToken.js";
import { catchAsyncErrors } from "../middelware/catchasyncErrors.js";
import { User } from "../modelschema/userSchema.js"; // Corrected path
import { ErrorHandler } from "../middelware/errorMiddelware.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
export const patientRegistration = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, gender, password } = req.body;
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
        return next(new Error("Please Fill Full Form!", 400)); // Assuming you handle errors this way
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new Error("User already Registered!", 400)); // Assuming you handle errors this way
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        gender,
        password,
        role: "Patient",
    });
    generateToken(user," Patient created securely",201,res);
});


export const login = catchAsyncErrors(async(req,res,next)=>{

  const {email,password,confirmPassword,role} = req.body;

  if(!email ||!password ||!confirmPassword||!role){
    return next(new ErrorHandler("Please fill the Form",400));
  }

  if(password!== confirmPassword){
    return next (
      new ErrorHandler("Password & Confirm Password Do Not Match!", 400)
    );
  }

  const user = await User.findOne({email}).select("+password");

  if(!user){
    return next(new ErrorHandler("Invalid Email Or Password!", 400));
  }

  const ispassword = await user.comparePassword(password);
  
  if(!ispassword) return next(new ErrorHandler("Invalid Email Or Password!", 400));

  if(role!==user.role){
    return next(new ErrorHandler(`User Not Found With This Role!`, 400))
  }
  generateToken(user,"login securely",201,res);

})


export const doctorRegistration = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
      return next(new Error("Please Fill Full Form!", 400)); // Assuming you handle errors this way
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
      return next(new Error("User already Registered!", 400)); // Assuming you handle errors this way
  }

  const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      role: "Doctor",
  });
  generateToken(user," Patient user securely",201,res);
});

export const adminRegistration = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
      return next(new Error("Please Fill Full Form!", 400)); // Assuming you handle errors this way
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
      return next(new Error("User already Registered!", 400)); // Assuming you handle errors this way
  }

  const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      role: "Admin",
  });
  generateToken(user," Patient user securely",201,res);
});



export const getAlldoctor = catchAsyncErrors(async(req,res,next)=>{
  const doctors = await User.find({role: "Doctor"});
  res.status(200).json({
    success:true,
    doctors,
  })
})


export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("admintoken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("patienttoken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
});



export const addnewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }

  const { docAvtar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!allowedFormats.includes(docAvtar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
     ||!docAvtar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler("Doctor With This Email Already Exists!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(docAvtar.tempFilePath);

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.log("cloudinary error", cloudinaryResponse.error || "Unknown error");
    return next(new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500));
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor Registered",
    doctor,
  });
});
