const express = require('express');
const router = express.Router();

const Item = require('../models/item');

router.get("", (req, res, next) => {
    Item.find()
    .then(documents => {
        // console.log(documents);
        res.status(200).json({
            items: documents
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "Items Fetch Failed",
        });
    });
});

module.exports = router;