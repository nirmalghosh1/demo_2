// Description: Mongoose data model for About Us Content
// Author: AshwinSathian

const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema({
     companyProfile: {
        type: String, 
     },    
     whatWeDo: {
        type: String, 
     }
});

module.exports = mongoose.model("AboutUs", AboutUsSchema);