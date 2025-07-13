const express = require('express');
const { getcontacts,updatecontact,deletecontact,addcontact ,getcontact} = require('../controllers/contactscontroller');
const router = express.Router();


router.route('/getcontacts').get(getcontacts);

router.route('/getcontact/:id').get(getcontact);

router.route('/addcontact').post(addcontact);   


router.route('/updatecontact/:id').put(updatecontact);                   

router.route('/deletecontact/:id').delete(deletecontact);   

// Export the router to be used in the main server file
module.exports = router;