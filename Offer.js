// models/Offer.js
const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    description: String,
    validFrom: Date,
    validTo: Date,
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
    storeId: String,
});

offerSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Offer', offerSchema);
