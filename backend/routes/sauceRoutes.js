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
router.get('/', auth);


router.get('/:id', auth);


router.post('/', auth);

router.put('/:id', auth);


router.delete('/:id', auth);


router.post('/:id/like', auth);


 module.exports = router;
 