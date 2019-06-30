// Description: Booking Route
// Author: AshwinSathian

const express = require('express');
const router = express.Router();

const Purchase = require('../models/purchase');

router.post('/', (req, res, next) => {
    const purchase = new Purchase({
        createdBy: req.body.createdBy,
        pickedItem1: req.body.pickedItem1,
        pickedItem2: req.body.pickedItem2, 
        pickedItem3: req.body.pickedItem3,
        pickedQty1: req.body.pickedQty1, 
        pickedQty2: req.body.pickedQty2, 
        pickedQty3: req.body.pickedQty3,
        deliveryDate: req.body.deliveryDate, 
        lat: req.body.lat, 
        lng: req.body.lng,
        phone: req.body.phone, 
        totalCost: req.body.totalCost
    });
    purchase
    .save()
    .then(createdPurchase => {
        res.status(201).json({
            message: "Purchase Created Successfully",
            createdPurchase: createdPurchase
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Purchase Creation failed!"
        });
    });
});

router.put("", (req, res, next) => {
    payment = 'Completed';
    id = req.body.id;
    Booking.update(
        { _id: id }, 
        { paymentStatus: payment }, 
        (err, response) => {
            if (err) {
                console.log(err);
            }
            console.log(response);
        } 
    );
});

module.exports = router;