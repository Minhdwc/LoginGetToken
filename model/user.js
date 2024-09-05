const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required: true},
    password: {type:String, required:true},
    confirmPassword:{type: String},
    dateOfBirth: {type: Date, required: true},
    email:{type: String, unique:true},
    role:{type:String, enum:['admin', 'customer'], default:'customer'},
})

const User = mongoose.model('User', UserSchema);

module.exports = User;