import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'First name must be at least 3 letters'],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'Last name must be at least 3 letters'],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, 'Phone number must be 10 digits long'],
        maxLength: [10, 'Phone number must be 10 digits long'],
    },
    message: {
        type: String,
        required: true,
        minLength: [10, 'Please write a valid message'],
    }
});

const Message = mongoose.model('Message', messageSchema);

export { Message };
