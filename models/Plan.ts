
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: plan model schema for capy finance web server
 */

import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
    title: { type: String, trim: true, maxlength: [80, 'title char limit is 80'] },
    content: { type: String, maxlength: [10000, 'content char limit is 10000'] },
    createDate: { type: Date, required: true, default: Date.now },
    active: { type: Boolean, required: true, default: true },
    username: { type: String, required: [true, 'username is required'] },
    userId: { type: Number, required: [true, 'userId is required'] },
    planId: { type: Number, required: [true, 'planId is required'] }
})

const Plan = mongoose.models.Plan || mongoose.model('Plan', PlanSchema)
export default Plan