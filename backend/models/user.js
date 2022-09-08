// To import mongoose
const mongoose = require('mongoose');

/** Package that verifies informations of inputs by the user before saving
 * in the data
 */
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

/** call the methode plugin on userSchema to pass the unique validator
 * 
 */
userSchema.plugin(mongooseUniqueValidator); 

module.exports = mongoose.model('User', userSchema);