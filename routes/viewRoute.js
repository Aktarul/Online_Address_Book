var express = require('express'),
    router = express.Router(),
    Contact = require('../models/contacts'),
    contactContorller = require('../controller/contact');

router.get('/createContact', function(req, res) {
    res.render('createContact.ejs');
});

router.post('/createContact', function(req, res) {
    console.log(req.user);

    //var userID = req.params.user_id;
    var firstName = req.body.first_name,
        lastName = req.body.last_name,
        email = req.body.email_address,
        mobile = req.body.mobile_number,
        userID = req.user._id;

    var myContact = new Contact({
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        mobile_number: mobile,
        userId: userID
    });

    myContact.save((err, contact) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.redirect('/profile');
        }
    });
});

router.get('/deleteContact/:id', function(req, res){
    Contact.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.redirect('/profile');
        }
    });
});

module.exports = router;
