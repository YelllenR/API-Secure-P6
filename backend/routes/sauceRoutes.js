/** Import express 
 * variable require contains the param express
 * @param {express} express
 */
const express = require('express');

const cors = require('cors');

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
router.get('/',  auth, sauceController.getSauces, function (request, response, next) {
    response.json({ message: "CORS is enable" })
});


router.get('/:id', auth, sauceController.getOneSauce, function (request, response, next) {
    response.json({ message: "CORS is enable" })
});


router.post('/', auth, multer, sauceController.postSauce, function (request, response, next) {
    console.log("post called")
    response.json({ message: "CORS for post is enable" })
    
});

router.put('/:id', auth, multer, sauceController.putSauce, function (request, response, next){
    response.json({ message: "CORS for put is enable" })
});


router.delete('/:id', auth, sauceController.deleteSauce, function (request, response, next){
    response.json({ message: "CORS for delete is enable" })
});


// router.post('/:id/like', auth, multer, sauceController.postSauce);


module.exports = router;
