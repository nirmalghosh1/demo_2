// Description: Booking Route
// Author: AshwinSathian

const express = require('express');
const router = express.Router();

const Booking = require('../models/booking');

router.post('/', (req, res, next) => {
    const booking = new Booking({
        createdBy: req.body.createdBy,
        name: req.body.name,
        date: req.body.date,
        pax: req.body.peopleCount,
        lat: req.body.lat,
        lng: req.body.lng,
        phone: req.body.phone,
        type: req.body.type,
        food: req.body.food,
        totalCost: req.body.totalCost
    });
    booking
    .save()
    .then(createdBooking => {
        res.status(201).json({
            // message: "Booking Created Successfully",
            // createdBooking: createdBooking
            id: createdBooking._id
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Booking Creation failed!"
        });
    });
});

module.exports = router;