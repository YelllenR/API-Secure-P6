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


// require('dotenv').config();

/** Connexion to mongoose 
 * 
*/
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true
})
    .then(() => console.log("connexion à MongoDB réussie ! "))
    .catch(() => console.log("connexion à MongoDB échouée"))


// to export application
module.exports = application;