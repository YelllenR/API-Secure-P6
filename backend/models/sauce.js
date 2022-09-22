// Importing mongoose to build the product model
const mongoose = require('mongoose');

/** Using mongoose with the class schema to build the model of the product
 * 
 * Type: The type of the value that it will contain (String or int)
 * 
 * Default: Sets a default number to zero. Starts at 0
 * 
 * require: The obligation to have or not the values
 */
const sauceSchema = mongoose.Schema({
    userId: { type: String, require: true },
    name: { type: String, require: true },
    manufacturer: { type: String, require: true },
    description: { type: String, require: true },
    mainPepper: { type: String, require: true },
    imageUrl: { type: String, require: true },
    heat: { type: Number, require: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0},
    usersLiked: [],
    usersDisliked: [],
});

module.exports = mongoose.model('Sauce', sauceSchema);