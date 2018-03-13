var express = require('express'),
        router = express.Router(),
        contactContorller = require('../controller/contact');

router.post('/', isLoggedIn, contactContorller.createContact);
router.get('/:id', isLoggedIn,contactContorller.getContact);
router.get('/', isLoggedIn,contactContorller.getAllContact);
router.patch('/:id', isLoggedIn,contactContorller.updateContact);
router.delete('/:id', isLoggedIn,contactContorller.deleteContact);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else{
        return res.status(404).json({
            message: "Not Authenticated"
        });
    }
}