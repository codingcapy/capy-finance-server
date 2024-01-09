

import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
    value: { type: Number, default: 0.00 },
    title: { type: String, trim: true, maxlength: [80, 'title char limit is 80'] },
    content: { type: String, maxlength: [10000, 'content char limit is 10000'] },
    createDate: { type: Date, required: true, default: Date.now },
    startDate: { type: Date, required: true, default: Date.now },
    active: { type: Boolean, required: true, default: true },
    planId: { type: Number, required: [true, 'planId is required'] },
    goalId: { type: Number, required: [true, 'goalId is required'] },
})

const Goal = mongoose.models.Goal || mongoose.model('Goal', GoalSchema)
export default Goal