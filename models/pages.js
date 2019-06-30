// Description: Mongoose data model for Users
// Author: AshwinSathian

const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
     aboutUs: {
        type: String
     }
});

module.exports = mongoose.model("Page", PageSchema);