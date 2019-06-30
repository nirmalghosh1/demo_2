// Description: Contact Message Route
// Author: AshwinSathian

const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.post('/', (req, res, next) => {
    const message = new Message({
        name: req.body.name,
        email: req.body.email.trim().toLowerCase(),
        subject: req.body.subject,
        content: req.body.content
    });
    message
    .save()
    .then(sentMessage => {
        res.status(201).json({
            message: "Message Sent Successfully",
            sentMessage: sentMessage
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Message sending failed!"
        });
    });
});

module.exports = router;