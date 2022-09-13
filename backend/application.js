const express = require("express");

const cors = require('cors');

// const bodyParser = require('body-parser');

/** Acces to express with application.js
 * 
*/
const application = express();
application.use(express.json());
application.use(express.urlencoded({ extended: true }));
// application.use(bodyParser.urlencoded({ extended: true }));
// application.use(bodyParser.json());


// const postCors = {
//     origin: true,
//     methods: ["POST"], 
// }



/** Importing mongoose 
 * 
*/
const mongoose = require("mongoose");

const userRoute = require('./routes/userRoutes');

const sauceRoute = require('./routes/sauceRoutes');




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

application.use((error, request, response, next) => {
    const message = `this is an unexpected fields ->${error.field} ${request.body}`;


    response.status(500).send(message);

});
// application.options('/api', cors());

// application.use('/api', express.static((__dirname, 'images')));


// to export application
module.exports = application;