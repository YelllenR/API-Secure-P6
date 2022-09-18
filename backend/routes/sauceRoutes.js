/** Import express 
 * variable require contains the param express
 * @param {express} express
 */
const express = require('express');



// multer here
const multer = require('../middleware/config-multer');


// router here
const router = express.Router();


// Import controller for sauce
const sauceController = require('../controller/sauceController');

// Import controller for user
const auth = require('../middleware/auth');


//  ROUTES FOR SAUCE

/**
 * 
 */
router.get('/', auth, multer, sauceController.getSauces);


router.get('/:id', auth, sauceController.getOneSauce);


router.post('/',  auth, multer, sauceController.postSauce);


router.put('/:id', auth, multer, sauceController.putSauce);


router.delete('/:id', auth, sauceController.deleteSauce);


// router.post('/:id/like', auth, multer, sauceController.postSauce);


module.exports = router;
