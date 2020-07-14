const { Schema, model } = require('mongoose');

const tripSchema = new Schema({
    location: { type: String, required: true },
    arriveDate: { type: Date, required: true },
    departDate: { type: Date, required: true },
    groupNumber: { type: Number, required: true, default: 2 },
    notes: { type: String },
}, {timestamps: true, strict: "throw"});

module.exports = model('trip', tripSchema);