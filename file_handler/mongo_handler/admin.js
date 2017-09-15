const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const Admin = new Schema({

    password: {
        type: String,
        required: [true, 'Please enter the last name'],
        match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, 'Password should contain minimum eight characters, at least one letter, one number and one special character'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
        unique: [true, 'email already registered'],
        trim: true
    }
});

module.exports = mongoose.model('Admin', Admin, 'Admin');