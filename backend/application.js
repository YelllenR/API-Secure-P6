const express = require("express");

/** Acces to express with application.js
 * 
*/
const application = express();
application.use(express.json());

/** Importing mongoose 
 * 
*/
const mongoose = require("mongoose");

const userRoute = require('./routes/userRoutes');

const sauceRoute = require('./routes/sauceRoutes');


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
})

    .then(() => console.log("Connexion successfull "))
    .catch(() => console.log("Please check connexion"));


/** Creating setup for CORS
 * @param {request, response, next}
 */
application.use((request, response, next) =>{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});




// with the method use and assigning properties for 1. the route and the connexion file
application.use('/api/auth', userRoute)



// to export application
module.exports = application;