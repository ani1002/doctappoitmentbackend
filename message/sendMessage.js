import express from 'express';
import { ErrorHandler } from '../middelware/errorMiddelware.js';
import { Message } from '../modelschema/message.js';
import { catchAsyncErrors } from '../middelware/catchasyncErrors.js';
export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler('Please fill the form', 400));
  }

  await Message.create({ firstName, lastName, email, phone, message });

  res.status(200).json({
    success: true,
    message: 'Message sent successfully'// message: "Appoitment created successfully.",
  });
});



export const getAllMessage = catchAsyncErrors(async(req,res,next)=>{
  const  message = await Message.find();
  res.status(200).json({
    success:true,
    message,
  })
})

