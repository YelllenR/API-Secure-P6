const express = require("express");

const cors = require('cors');


/** Acces to express with application.js
 * 
*/
const application = express();
application.use(express.json());
application.use(express.urlencoded({ extended: false }));

/** Importing mongoose 
 * 
*/
const mongoose = require("mongoose");


const userRoute = require('./routes/userRoutes');

const sauceRoute = require('./routes/sauceRoutes');

const path = require('path');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then((response) => response = console.log("Connexion successfull"))
    .catch(errorConnexion => {
        console.error("Please check connexion", errorConnexion)
        process.exit();
    });




application.use('/api', cors());


// with the method use and assigning properties for the route and the connexion file

application.use('/api/auth', cors(), userRoute);


// With the method use and assigning properties for the route and the connexion file
application.use('/api/sauces', cors(), sauceRoute);
application.use('/images', express.static((__dirname, 'images')));



application.use((error, request, response, next) => {
    const message = `An error occured ->${error.field} ${request.body}`;
    response.status(500).send(message);
});






// to export application
module.exports = application;