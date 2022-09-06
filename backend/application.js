const express = require("express");

const application = express();
application.use(express.json());


// Import mongoose
const mongoose = require("mongoose");
const path = require("path/posix");
require('dotenv').config({ path: './.env' });



/** Connexion to mongoose
 * 
 */

mongoose.connect(process.env.DB_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connexion à MongoDB réussie ! "))
    .catch(() => console.log("connexion à MongoDB échouée"))



// to export application
module.exports = application;