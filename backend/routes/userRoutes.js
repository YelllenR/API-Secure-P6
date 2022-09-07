/** Import to use express and add a router
 * 
 */
const express = require("express");

const router = express.Router(express);

// Access to controller file
const userController = require("../controller/userController");


// Method signUp used
router.post("/signUp", userController.signUp);
