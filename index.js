import express from 'express';
import cors from 'cors';
 // Ensure the correct file path
 import fileUpload from "express-fileupload";
 import cloudinary from "cloudinary";
 import './connnection/connect.js';
//import { errorMiddleware } from './middleware/errorMiddelware.js'; // Corrected path
import { errorMiddleware } from './middelware/errorMiddelware.js';
import messagerouter from './routes/messagerouter.js'; // Ensure the correct file path
// test.js
import cookieParser  from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
//console.log(process.env.JWT_SECRET); // Should log the environment variables, including JWT_SECRET


import userroute from "./routes/userroute.js"; // Ensure the correct file path
import appoitmentroute from "./routes/appoitmentroute.js"; // Ensure the correct file path
const app = express();
app.use(cookieParser()); //
app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Include this if you need to send cookies or authentication headers
  })
);
app.options('*', cors()); // Handle preflight requests


cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/api/v1/message', messagerouter);
app.use('/api/v1/user', userroute);
app.use('/api/v1/newappitment', appoitmentroute);
// CORS


//app.use(
  //cors({
 //   origin: 'http://localhost:5173', // Your frontend URL
 //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
 //   credentials: true, // Include this if you need to send cookies or authentication headers
 // })
//);


// App Running
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(errorMiddleware);
