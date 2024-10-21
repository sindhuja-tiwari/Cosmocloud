// routes/offers.js
const express = require('express');
const Offer = require('../models/Offer');
const router = express.Router();

// Add a new offer
router.post('/', async (req, res) => {
    const newOffer = new Offer(req.body);
    await newOffer.save();
    res.status(201).send(newOffer);
});

// Get nearby offers
router.get('/nearby', async (req, res) => {
    const { longitude, latitude } = req.query;
    const offers = await Offer.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(longitude), parseFloat(latitude)]
                },
                $maxDistance: 5000 // 5 km
            }
        }
    });
    res.send(offers);
});

module.exports = router;
