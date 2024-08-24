
import express from "express";
import { getAlldoctor, getUserDetails, patientRegistration ,logoutAdmin,logoutPatient, addnewDoctor} from "../message/userCreate.js"; // Ensure this path is correct
import { login } from "../message/userCreate.js";
import { adminRegistration } from "../message/userCreate.js";;
import { isAdminauthenticated } from "../middelware/auth.js";
import { isPatientauthenticated } from "../middelware/auth.js";

const route = express.Router();

route.post("/patient/register", patientRegistration);  //patient registration
route.post("/patient/loggedin",isPatientauthenticated,login);//patient loggedin
route.post("/admin/loggedin",isAdminauthenticated,login);//admin loggedin
route.post("/admin/addnew",isAdminauthenticated,adminRegistration);  //admin authentication registration
route.post("/patient/getall",getAlldoctor); //getting all doctors
route.post("/doctor/add-new",isAdminauthenticated,addnewDoctor); //new doctor adding

route.get("/patient/me",isPatientauthenticated,getUserDetails);  //patient checking personal info
route.get("/admin/me",isAdminauthenticated,getUserDetails);  //admin authenticated
route.get("/admin/logout",isAdminauthenticated,logoutAdmin); //logout patient
route.get("/patient/logout",isPatientauthenticated,logoutPatient);  //patient logout
route.get("/doctor/getall",getAlldoctor); //getting all doctor
export default route;
