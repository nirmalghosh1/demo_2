// Description: Mongoose data model for Bookings
// Author: AshwinSathian

const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    createdBy: {
        type: String, 
        required: true
    },    
    name: {
        type: String, 
        required: true
    },
    date: {
         type: Date,
         required: true
    },
    pax: {
        type: Number,
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
    type: {
        type: String,
        required: true
    }, // Event type
    food: {
        type: String,
        required: false
    }, 
    // xtras: [{
    //     name: {
    //         type: String, 
    //         required: true
    //     },    
    //     price: {
    //          type: Number,
    //          required: true
    //     }
    // }], // Extras like Games etc
    // items: [{
    //     name: {
    //         type: String, 
    //         required: true
    //     },
    //     qty: {
    //         type: Number, 
    //         required: true
    //     },    
    //     price: {
    //         type: Number,
    //         required: true
    //     }
    // }], // Light and Sound Requirements
    // emceeReqd: {
    //     type: Boolean,
    //     required: true
    // },
    // remarks: {
    //     type: String,
    //     required: false
    // },
    totalCost: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        default: 'Pending'
    }
});

module.exports = mongoose.model("Booking", BookingSchema);