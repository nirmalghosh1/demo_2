// Author: AshwinSathian

const mongoose = require("mongoose");

const ForgotSchema = new mongoose.Schema({
     email: {
        type: String, 
     },    
     token: {
        type: String, 
     },
     expirationTime: {
     	type: String
     },
     valid: {
     	type: Boolean
     }
});

module.exports = mongoose.model("Forgot", ForgotSchema);