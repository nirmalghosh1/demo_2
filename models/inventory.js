// Description: Mongoose data model for Inventory
// Author: AshwinSathian

const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    },    
    rentPrice: {
        type: Number, 
        required: true
    },
    purPrice: {
        type: Number, 
        required: true
    }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);