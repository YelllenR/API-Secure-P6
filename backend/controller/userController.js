// Import user model
const User = require('../models/user');

/** Installation of bcrypt 
 * Import Bcrypt
 */
const bcrypt = require('bcrypt');

/** Installation of package jsonwebtoken
 * Import jsonwebtoken
 */
const jsonwebtoken = require('jsonwebtoken');

/** 1. .signUp takes three parameters: 1. the request on signing up, 2. the response and next(* not used here)
 *  2. Gets the crypted password which is an asynchronus method that returns promise
 *  3. In promise, the new user is created according to the mongoose model
 *  4. Using save to save the new user and take promise to execute
 *  5. After the crypt process, a catch is used to catch any error occuring
 */
exports.signup = (request, response, next) => {
    bcrypt.hash(request.body.password, 10)
    .then(cryptedPassword =>{
        const user = new User({
            email: request.body.email,
            password: cryptedPassword
        });

        user.save()
        .then(() => response.status(201).json({ message: "User created"}))
        .catch(error => response.status(400).json({message: error + "Something went wrong"}));
    })

   
    .catch(error => response.status(500).json({error}));
};
