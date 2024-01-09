
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: variable expenditure model schema for capy finance web server
 */

import mongoose from "mongoose"

const VariableSchema = new mongoose.Schema({
    value: { type: Number, default: 0.00 },
    title: { type: String, trim: true, maxlength: [80, 'title char limit is 80'] },
    content: { type: String, maxlength: [10000, 'content char limit is 10000'] },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date },
    planId: { type: Number, required: [true, 'planId is required'] },
    vExpId: { type: Number, required: [true, 'vExpId is required'] },
})

const Variable = mongoose.models.Variable || mongoose.model('Variable', VariableSchema)
export default Variable