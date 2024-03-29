
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: user model schema for capy finance web server
 */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'username is required'], trim: true, maxlength: [80, 'username char limit is 80'] },
    password: { type: String, required: [true, 'password is required'], maxlength: [80, 'password char limit is 80'] },
    createDate: { type: Date, required: true, default: Date.now },
    active: { type: Boolean, required: true, default: true },
    userId: { type: Number, required: [true, 'userId is required'] }
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)
export default User