const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true },    
    email: { type: String, required: true },
    subject: { type: String, required: true },    
    content: { type: String, required: true }
});

module.exports = mongoose.model("Message", MessageSchema);