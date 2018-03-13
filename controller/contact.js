var Contact = require('../models/contacts');

var createContact = (req, res, next) => {
    console.log(req.body);

    //var userID = req.params.user_id;
    var firstName = req.body.first_name,
        lastName = req.body.last_name,
        email = req.body.email_address,
        mobile = req.body.mobile_number;



    var myContact = new Contact({
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        mobile_number: mobile
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
    
}

var getAllContact = (req, res, next) => {
    
}

var updateContact = (req, res, next) => {

}

var deleteContact = (req, res, next) => {

}

module.exports = {
    createContact,
    getAllContact,
    getContact,
    deleteContact,
    updateContact
}