// Description: Mongoose data model for Testimonial Content
// Author: AshwinSathian

const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
     content: {
        type: String, 
     },    
     by: {
        type: String, 
     }
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);