var express = require('express'),
        router = express.Router(),
        contactContorller = require('../controller/contact');

router.post('/',contactContorller.createContact);
router.get('/:id',contactContorller.getContact);
router.get('/',contactContorller.getAllContact);
router.patch('/:id',contactContorller.updateContact);
router.delete('/:id',contactContorller.deleteContact);

module.exports = router;
