const mongoose = require('mongoose');



const sauceLikedOrNot = mongoose.Schema({
    userId: { type: String, require: true }, 
    like: {type: Number}, 
    dislike: {type: Number}, 
    neutral: {type: Number}
});



module.exports = mongoose.model('Sauce likes', sauceLikedOrNot);