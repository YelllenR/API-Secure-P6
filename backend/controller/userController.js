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


// /** Array of like type for sauce
//  * 
//  */
// const likeSauce = {
//     like: 1,
//     neutral: 0,
//     dislike: -1
// };

/** 1. .signUp takes three parameters: 1. the request on signing up, 2. the response and next(* not used here)
 *  2. Gets the crypted password which is an asynchronus method that returns promise
 *  3. In promise, the new user is created according to the mongoose model
 *  4. Using save to save the new user and take promise to execute
 *  5. After the crypt process, a catch is used to catch any error occuring
 */
exports.signup = (request, response, next) => {

    bcrypt.hash(request.body.password, 10)
        .then(cryptedPassword => {
            const user = new User({
                email: request.body.email,
                password: cryptedPassword
            });

            user.save()
                .then(savingUser => response.status(201).json({ message: "User created" + savingUser }))
                .catch(error => response.status(400).json({ message: error + "Something went wrong" }));
        })

        .catch(error => response.status(500).json({ message: error }));
};


/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * 1. Find one user in database with property of the request body containing the email
 * 2. Method waits for promise.
 * 3. If statement to check if user is null and if it's the case, fires a message
 * 4. Else | using bcrypt to compare the request body for the password with the user's password
 * 5. Another if statement to check if it is correct or not to show the right message
 * 
 */
exports.login = (request, response, next) => {
    User.findOne({ email: request.body.email })
        
        .then(user => {

            if (user === null) {
                response.status(401).json({ message: "Please check your email and password" })
            } else {

                bcrypt.compare(request.body.password, user.password)

                    .then(valid => {
                        if (!valid) {
                            response.status(401).json({ message: "Paire identifiant/ mot de passe incorrecte" })
                        } else {
                            response.status(200).json({
                                userId: user._id,

                                token: jsonwebtoken.sign(

                                    { userId: user._id },

                                    process.env.SECRETE_TOKEN,

                                    { expiresIn: "12h" }
                                )
                            })
                        }
                    })

                    .catch(error => {
                        response.status(500).json({ error });
                    })
            }
        })

        .catch(error => {
            response.status(500).json({ error });
        });

};

