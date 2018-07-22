var Contact = require('../models/contacts');

var createContact = (req, res, next) => {
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
            return res.status(200).json({
                success: true,
                data: contact
            });
        }
    });

};

var getContact = (req, res, next) => {
    Contact.findById(req.params.id, (err, contact) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: contact
            });
        }
    });
};

var getAllContact = (req, res, next) => {
    Contact.find({
        userId: req.user._id
    }, (err, contacts) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                success: true,
                data: contacts
            });
        }
    });
};

var updateContact = (req, res, next) => {
    var firstName = req.body.first_name,
        lastName = req.body.last_name,
        email = req.body.email_address,
        mobile = req.body.mobile_number,
        userID = req.user._id;

    Contact.findById(req.params.id, (err, contact) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            contact.first_name = firstName || contact.first_name;
            contact.last_name = lastName || contact.last_name;
            contact.email_address = email || contact.email;
            contact.mobile_number = mobile || contact.mobile_number;

            contact.save((err, contact) => {
                if(err){
                    return res.status(404).json({
                        message: err,
                        success: false
                    });
                }
                else {
                    return res.status(200).json({
                        success: true,
                        data: contact
                    });
                }
            })
        }
    });

};

var deleteContact = (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            return res.status(404).json({
                message: err,
                success: false
            });
        }
        else {
            return res.status(200).json({
                message: "Contacts deleted",
                success: true
            });
        }
    });
};

module.exports = {
    createContact,
    getAllContact,
    getContact,
    deleteContact,
    updateContact
};