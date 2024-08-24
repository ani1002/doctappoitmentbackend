import { catchAsyncErrors } from "../middelware/catchasyncErrors.js";
import { ErrorHandler } from "../middelware/errorMiddelware.js";

import { Appointment } from "../modelschema/appoitmentSchema.js";
import { User } from "../modelschema/userSchema.js";//newAppoitmentcreate

export const newAppoitmentcreate = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    address,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(new ErrorHandler('Please Fill Full Form!', 400));
  }

  // Ensure user is authenticated
  if (!req.user || !req.user._id) {
    return next(new ErrorHandler('Patient Id Is Required!', 400));
  }

  // Find the doctor in the User collection
  const doctor = await User.findOne({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: 'Doctor',
    doctorDepartment: department,
  });

  if (!doctor) {
    return next(new ErrorHandler('Doctor not found', 404));
  }

  // Convert ObjectId to string
  const doctorId = doctor._id.toString();
  const patientId = req.user._id.toString();

  //console.log('Doctor:', doctor);
  //console.log('Doctor ID:', doctorId);
  //console.log('Patient ID:', patientId);
  
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    appointment_date,
    department,
    doctorId, // Store doctorId as string
    patientId, // Store patientId as string
    address,
  });

  res.status(200).json({
    success: true,
    message: "Appoitment created successfully.",
    
  });
});



export const getAllAppoitment = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});