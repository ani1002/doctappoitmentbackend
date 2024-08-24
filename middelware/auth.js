import { User } from "../modelschema/userSchema.js";

import { catchAsyncErrors } from "./catchasyncErrors.js";
import { ErrorHandler } from "./errorMiddelware.js";
import jwt from "jsonwebtoken";

export const isAdminauthenticated =  catchAsyncErrors(async(req,res,next)=>{
  const token = req.cookies.admintoken;
  if(!token){
    return next(
        new ErrorHandler("Dashboard User is not authenticated!", 400)
      );
  }
  const decode = jwt.verify(token,process.env.JWT_SECRET);
  req.user = await User.findById(decode.id);

  if (req.user.role !== "Admin") {   
    return next(
      new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
    );
  }
  next();  
})


export const isPatientauthenticated =  catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.patienttoken;
    if(!token){
      return next(
          new ErrorHandler("Dashboard User is not authenticated!", 400)
        );
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
  
    if (req.user.role !== "Patient") {
      return next(
        new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
      );
    }
    next();  
  })

  export const authenticate = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const user = await User.findOne({ token });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };