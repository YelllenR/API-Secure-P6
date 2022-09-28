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

    .then(() => response = console.log("Connecté à la base de données"))
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

    // It prevents a document from loading any cross-origin resources if it doesn't have any permission
    helmet.crossOriginEmbedderPolicy({ policy: "require-corp" }),

    // Another layer of security to specify that the resources come frome the same site
    helmet({ crossOriginResourcePolicy: { policy: "same-site" } }),

    // It removes the powered by header
    helmet.hidePoweredBy(),

    // Blocks the cross reading for the same MIME types
    helmet.noSniff(),
    
    // Activates the strict transport security, that forces the client to use only secure connections to access the site
    // If it is still active, it prevents attack of type man-in-the-middle
    helmet.hsts({
        maxAge: 123456,
        includeSubDomains: false
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


// to export application
module.exports = application;