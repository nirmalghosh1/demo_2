// Description: Mongoose data model for Conatct Us Data
// Author: AshwinSathian

const mongoose = require("mongoose");

const ContactUsSchema = new mongoose.Schema({
    address1: {
        type: String, 
    },
    address2: {
        type: String, 
    },    
    address3: {
        type: String, 
    },        
    number1: {
        type: String, 
    },
    number2: {
        type: String, 
    },
    email: {
        type: String, 
    }
});

module.exports = mongoose.model("ContactUs", ContactUsSchema);