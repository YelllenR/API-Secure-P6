/** Import express 
 * variable require contains the param express
 * @param {express} express
 */
const express = require('express');


// multer here


// router here
const router = express.Router();


// Import controller for sauce
const sauceController = require('../controller/sauceController');

// Import controller for user
const authentification = require('../middleware/authentification');


// Routes to be used
router.post('/api/auth/signup', authentification);


module.exports = router;
