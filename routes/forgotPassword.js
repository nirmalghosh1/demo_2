const express = require('express');
const User = require('../models/user');
const Forgot = require('../models/forgotModel')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const date = require('date-and-time');

const bcrypt = require('bcryptjs');


const router = express.Router();
const TokenGenerator = require('uuid-token-generator');


const transporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'AKIAIWMQ5MFPUFN6NWXQ', // generated ethereal user
      pass: 'Av8sbAvoFYA5JfzhEU+j2jJWYVeWPafSkcMW8mTMiU71' // generated ethereal password
    }
  });


  // Source: http://stackoverflow.com/questions/497790
var dates = {
    convert:function(d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    },
    compare:function(a,b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },
    inRange:function(d,start,end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
       return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    }
}

router.post('',(req,res,next) => {
	const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58

	const email = req.body.email.trim();
	 User.findOne({ email: email })
    .then(user => {
        if(!user) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

    
    Forgot.findOne({
    	email: email,
    	valid: true
    }).then(result => {
    	if(!result) {

    console.log('creation')
    let token_generated = tokgen.generate();
    let dt = new Date();
    dt.setHours( dt.getHours() + 1 );
    const forgotEntry = new Forgot({
    	email: email,
    	token: token_generated,
    	expirationTime: dt,
    	valid: true
    });
   
    forgotEntry.save().then(result => { 		
    	if(result) {

    	let mailOptions = {
		    from: '"Shantz Events 👻" <events@reubro.tk>', 
		    to: email, 
		    subject: "Password Reset ✔",
		    html: "<b>Please find your email link below</b> - <br>" + 
		    	  "http://10.0.0.103:4200/resetPassword/" + token_generated, 
		  };
			  transporter.sendMail(mailOptions).then(info =>{
					if(info.messageId) {
						return res.status(200).json({
    					status: 'success'
    				})//successfull mal
					} else {
						return res.status(400).json({
    					status: 'failed'
    				})//mail failure
					}
			}); //end of mail 
    	    

    	}
    }); //database entry for token

    	} else {
    		console.log('edition')

 			let token_generated = tokgen.generate();
    		let dt = new Date();
    		dt.setHours( dt.getHours() + 1 );
    		
    		Forgot.updateOne({
    			_id : result._id
    		},
    		{
    			email: result.email,
    			token: token_generated,
    			expirationTime: dt,
    			valid: true
    		}).then(result => {

    let dt = new Date();
    dt.setHours( dt.getHours() + 1 );

		let mailOptions = {
		    from: '"Shantz Events 👻" <events@reubro.tk>', 
		    to: email, 
		    subject: "Password Reset ✔",
		    html: "<b>Please find your email link below</b> - <br>" + 
		    	  "http://10.0.0.103:4200/resetPassword/" + token_generated, 
		  };
			  transporter.sendMail(mailOptions).then(info =>{
					if(info.messageId) {
						return res.status(200).json({
    					status: 'success'
    				})//successfull mal
					} else {
						return res.status(400).json({
    					status: 'failed'
    				})//mail failure
					}
			}); //end of mail 

    		});// update and sent mail
    	}
    });


    })//check for user existence
    .catch(error =>{
    	res.status(401).json({
    		message: "unexpected error",
    		error: error
    	})
    });

})




router.put('',(req,res,next) => {
    
    let token = req.body.token;
    let password = req.body.new_pass;

    Forgot.findOne({
        token: token
    }).then(result =>{
        if(result){
            let expiryTime = result.expirationTime.split(" ");
                let month = getKeyByValue(expiryTime[1]);
                month = Number(month) + 1;
                let expirationTime = expiryTime[3]+'-'+month+'-'+expiryTime[2]+' '+expiryTime[4];
                    expirationTime = expirationTime.replace(/-/g,'/');
                let now = new Date();

                now = now.toLocaleString();
                now = now.replace(/-/g,'/');
                let x = dates.compare(now,expirationTime)


                if(x === -1) {
                    console.log('are we haere')
                 bcrypt.hash(password, 10)
                 .then(hash => {

                    User.updateOne({
                        email: result.email
                    },{
                        password: hash
                    }).then(result =>{
                        if(result) {
                        Forgot.deleteOne({
                            token: token
                        }).then(result =>{
                            console.log(result);
                           return res.status(200).json({
                                message: 'success'
                            });
                        });// deleting the entry from forgot collection

                        } else {
                           res.status(200).json({
                            message: 'updation_failure'
                        }); 
                        } 

                    });// user password updation
                 });
            
                } else {
                    res.status(500).json({
                        message: 'reset link timed out'
                    })
                }


        }// if result
    })
})



function getKeyByValue(value) {
     const object = {
        0:'Jan',
        1:'Feb',
        2:'Mar',
        3:'Apr',
        4:'May',
        5:'Jun',
        6:'Jul',
        7:'Aug',
        8:'Sep',
        9:'Oct',
        10:'Nov',
        11:'Dec' };

  return Object.keys(object).find(key => object[key] === value);
}


sentMail = (email, token_generated) => {

		let mailOptions = {
		    from: '"Shantz Events 👻" <events@reubro.tk>', 
		    to: email + ", baz@example.com", 
		    subject: "Hello ✔",
		    html: "<b>Please find your email link below</b> - <br>" + 
		    	  "http://10.0.0.103:4200/resetPassword/" + token_generated, 
		  };

			  transporter.sendMail(mailOptions).then(info =>{
					if(info.messageId) {
						return 1;
					} else {
						return 0;
					}
			}); //end of mail 
}


module.exports = router;