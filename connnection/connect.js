import  mongoose from 'mongoose';


const mongoDB = "mongodb://127.0.0.1/doctorappoitment";

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));