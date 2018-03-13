var mongoose = require('mongoose');

var ContactsSchema = mongoose.Schema({
        first_name : String,
        last_name : String,
        email_address: String,
        mobile_number : [String],
        userId : String
});

module.exports = mongoose.model("Contacts",ContactsSchema);