// Description: Mongoose data model for Purchases
// Author: AshwinSathian

const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
    createdBy: {
        type: String, 
        required: true
    },
    pickedItem1: {
         type: String,
         required: true
    },
    pickedItem2: {
        type: String,
        required: false
    },
    pickedItem3: {
        type: String,
        required: false
    },
    pickedQty1: {
        type: Number,
        required: true
    },
    pickedQty2: {
        type: Number,
        required: false
    },
    pickedQty3: {
        type: Number,
        required: false
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: 'Pending'
    }
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
