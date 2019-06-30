// Description: Mongoose data model for our Services
// Author: AshwinSathian

const mongoose = require("mongoose");

const OurServiceSchema = mongoose.Schema({
  title: { 
    type: String
  },
  content: { 
    type: String
  }
});

module.exports = mongoose.model("OurService", OurServiceSchema);
