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


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
})
    .then(() => console.log("Connexion successfull "))
    .catch(() => console.log("Please check connexion"));


const userRoute = require('./routes/userRoutes'); 

const sauceRoute = require('./routes/sauceRoutes'); 

// to export application
module.exports = application;