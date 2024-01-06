

import mongoose from "mongoose"

const FixedSchema = new mongoose.Schema({
    value: { type: Number, default: 0.00 },
    title: { type: String, trim: true, maxlength: [80, 'title char limit is 80'] },
    content: { type: String, maxlength: [10000, 'content char limit is 10000'] },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date },
    planId: { type: Number, required: [true, 'planId is required'] },
    fExpId: { type: Number, required: [true, 'fExpId is required'] },
})

const Fixed = mongoose.models.Fixed || mongoose.model('Fixed', FixedSchema)
export default Fixed