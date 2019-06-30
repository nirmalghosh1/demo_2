// Braintree payments route
// Author: AshwinSathian

const express = require('express');
const router = express.Router();

const Booking = require('../models/booking');
const Rental = require('../models/rental');
const Purchase = require('../models/purchase');

const braintree = require('braintree');

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: 'tjnggdzyg92n8k6x',
  publicKey: 'qc3ktrfdwn88j98d',
  privateKey: '1427b29334d8a5dc53b755e5d2c78dc5'
});

router.get('/client-token', (req, res, next) => {
    gateway.clientToken.generate({}, (err, response) => {
        // console.log(response.clientToken);
        res.status(200).json({
            token: response.clientToken
        });
    });
});

router.post("/checkout", function (req, res) {
    const nonceFromTheClient = req.body.nonce;
    const chargeAmount = req.body.chargeAmount;
    gateway.transaction.sale({
        amount: chargeAmount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
        console.log(result);
        res.send(result);
        if (result.success) {
            console.log('Success');
        }
    });
});

router.put(
    '/booking/:id', 
    (req, res, next) => {
        const id = req.params.id; 
        payment = 'Complete'
        Booking.updateOne(
            { _id: id }, 
            { paymentStatus: payment }
        )
        .then(response => {
            res.status(200).json({
                message: 'Payment Status Updated',
                response: response
            });
        })
        .catch(error => {
            res.status(500).jsom({
                message: 'Update Failed', 
                error: error
            });
        });
    }
);

router.put(
    '/rental/:id', 
    (req, res, next) => {
        const id = req.params.id; 
        payment = 'Complete'
        Rental.updateOne(
            { _id: id }, 
            { paymentStatus: payment }
        )
        .then(response => {
            res.status(200).json({
                message: 'Payment Status Updated',
                response: response
            });
        })
        .catch(error => {
            res.status(500).jsom({
                message: 'Update Failed', 
                error: error
            });
        });
    }
);

router.put(
    '/purchase/:id', 
    (req, res, next) => {
        const id = req.params.id; 
        payment = 'Complete'
        Purchase.updateOne(
            { _id: id }, 
            { paymentStatus: payment }
        )
        .then(response => {
            res.status(200).json({
                message: 'Payment Status Updated',
                response: response
            });
        })
        .catch(error => {
            res.status(500).jsom({
                message: 'Update Failed', 
                error: error
            });
        });
    }
);

module.exports = router;