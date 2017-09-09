const mongoose = require('mongoose');
const Address = require('./Address');

const Schema = mongoose.Schema;


const Vendor = new Schema({


    vendorName: {
        type: String,
        required: [true, 'Please enter the last name'],
        match: [/^[A-Za-z]{2,20}$/, 'Only alphabets are allowed'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Please enter the email'],
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
        unique: [true, 'email already registered'],
        trim: true
    },

    telephone_no: {
        type: Number,
        required: [true, 'Please enter the contact no'],
        match: [/^[0-9]{10,14}$/, 'Only numeric value is allowed(10-14 digits only']

    },
    region:{type:String,
        required:[true,'Please enter the your region(north,south,east,west)'],
        enum:['north', 'south', 'east', 'west']
    },
    address: {
        type: Address,
        trim: true
    },
    profile:{
        type:String
    },
    blocked:{
        type:Boolean,
        default:false
    },
    status_active:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('Vendor', Vendor, 'Vendor');