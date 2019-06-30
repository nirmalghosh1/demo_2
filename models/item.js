// Description: Mongoose data model for Inventory
// Author: AshwinSathian

const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    },    
    rentPrice: {
        type: Number, 
        required: true
    },
    salePrice: {
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model("Item", ItemSchema);