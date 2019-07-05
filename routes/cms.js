const express = require('express');
const router = express.Router();

const Testimonial = require('../models/testimonial');

router.get('/testimonial', (req, res, next) => {
    Testimonial.find()
    .then(documents => {
        res.status(200).json({
            message: 'Testimonials Fetched Successfully',
            testimonials: documents
        });
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(
            {
                message: 'Failed to fetch Testimonials',
                error: error
            }
        );
    });
});


const AboutUs = require('../models/aboutUs');

router.get('/about-us', (req, res, next) => {
    AboutUs.find()
    .then(documents => {
        res.status(200).json({
            message: 'About Us Fetched Successfully',
            aboutUs: documents
        });
    })
    .catch(error => {
        res.status(500).json(
            {
                message: 'Failed to fetch About Us',
                error: error
            }
        );
    });
});


const OurService = require("../models/ourService");
  
router.get("/our-service", (req, res, next) => {
    OurService.find()
    .then(documents => {
        res.status(200).json({
          message: "Our Service Data Fetched Successfully!",
          ourServices: documents
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching Our Services Failed!"
        });
    });
});
  

const ContactUs = require('../models/contactUs');

router.get('/contact-us', (req, res, next) => {
    ContactUs.find()
    .then(documents => {
        res.status(200).json({
            message: 'About Us Fetched Successfully',
            contactUs: documents
        });
    })
    .catch(error => {
        res.status(500).json(
            {
                message: 'Failed to fetch About Us',
                error: error
            }
        );
    });
});


module.exports = router;