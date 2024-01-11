
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: plan model schema for capy finance web server
 */

import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    email: { type: String, trim: true, maxlength: [255, 'title char limit is 80'] },
    content: { type: String, maxlength: [40000, 'content char limit is 10000'] },
    createDate: { type: Date, required: true, default: Date.now },
    messageId: { type: Number, required: [true, 'messageId is required'] }
})

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema)
export default Message