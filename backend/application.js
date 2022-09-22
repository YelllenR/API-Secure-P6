/** Importing the express module
 * 
 */
const express = require("express");

/** Importing the cors module
 * 
 */
const cors = require('cors');

/** Importing the helmet module
 * 
 */
const helmet = require('helmet');

/** Acces to express with application.js
 * 
*/
const application = express();

/** Importing mongoose 
 * 
*/
const mongoose = require("mongoose");

/** Importing the route for user with the file path 
 * 
*/
const userRoute = require('./routes/userRoutes');

/** Importing the route for product with the file path 
 * 
*/
const sauceRoute = require('./routes/sauceRoutes');

/** Importing the module path in order to get access to the path of the image file 
 * 
*/
const path = require('path');

/** Connexion to database with the function connect that takes in param the connexion uri
 * @return {Promise} Promise of a success return or to catch the error and exit the connexion
 * 
*/
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then((response) => response = console.log("Connecté à la base de données"))
    .catch(errorConnexion => {
        console.error("Connexion échouée", errorConnexion)
        process.exit();
    });

// Use property with function express.json in in order to tell the app to use express 
application.use(express.json());

// use with function express.urlencoded to parse the data 
application.use(express.urlencoded({ extended: false }));

// use property with configuration for security concept, module Helmet is used for this
application.use(
    helmet.crossOriginEmbedderPolicy({ policy: "credentialless" }),
    helmet({ crossOriginResourcePolicy: { policy: "same-site" } }),
    helmet.hidePoweredBy(),
    helmet.noSniff(),
    helmet.hsts({
        maxAge: 123456,
        includeSubDomains: false,
    })
);



// In order to use the cors previouly imported
application.use('/api', cors());


// with the method use and assigning properties for the route and the connexion file
application.use('/api/auth', cors(), userRoute);


// With the method use and assigning properties for the route and the connexion file
application.use('/api/sauces', cors(), sauceRoute);

// Accessing and connecting to the images folder
application.use('/images', express.static(path.join(__dirname, 'images')));


// To render a message if an error occurs
application.use((error, request, response, next) => {
    const message = `An error occured ->${error.field} ${request.body}`;
    response.status(500).send(message);
});






// to export application
module.exports = application;