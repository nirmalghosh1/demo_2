const express = require('express');
const router = express.Router();
const fs = require('fs');
const dir = './gallery';

let fileCount = 1;

router.get("", (req, res, next) => {
    fs.readdir(dir, (err, files) => {

        console.log(files.length);
        fileCount = files.length;
        console.log(fileCount);
        res.status(200).json({
            message: "File Count Fetched Successfully",
            fileCount: fileCount
        });
        console.log(fileCount);
        fileCount = 1;
    });
});

module.exports = router;