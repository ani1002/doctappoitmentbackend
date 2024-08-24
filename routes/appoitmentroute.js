import express from 'express';
import { newAppoitmentcreate,getAllAppoitment } from '../message/appoitmentController.js';
const router = express.Router();
import { authenticate,isPatientauthenticated } from '../middelware/auth.js';
router.post('/newappoitment',isPatientauthenticated,newAppoitmentcreate);//appoitment
router.get('/getAllAppoitment',getAllAppoitment);

export default router;

//string a convert kora try korbo doctor ar patient id ta 
