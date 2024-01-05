

import mongoose from "mongoose"

const AssetSchema = new mongoose.Schema({
    value: { type: Number, default: 0.00 },
    title: { type: String, required: [true, 'title is required'], trim: true, maxlength: [80, 'title char limit is 80'] },
    content: { type: String, required: [true, 'content is required'], maxlength: [10000, 'content char limit is 10000'] },
    growthRate: { type: Number, default: 0.00 },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date },
    planId: { type: Number, required: [true, 'planId is required'] },
    assetId: { type: Number, required: [true, 'assetId is required'] },
})

const Asset = mongoose.models.Asset || mongoose.model('Asset', AssetSchema)
export default Asset