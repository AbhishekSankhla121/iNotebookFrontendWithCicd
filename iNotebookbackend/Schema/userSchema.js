const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    }

});

const User = mongoose.model("User", user);
User.createIndexes();

module.exports = User;