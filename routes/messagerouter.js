import express from 'express';
import { sendMessage,getAllMessage } from '../message/sendMessage.js'; // Ensure the correct file path and extension
import { isAdminauthenticated } from "../middelware/auth.js";
const router = express.Router();

router.post('/send', sendMessage);// send message 
router.get('/getallmessage',isAdminauthenticated,getAllMessage); //get all message 

export default router;
