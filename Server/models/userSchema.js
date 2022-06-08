const mongoose = require('mongoose');   //import mongoose module
const Schema = mongoose.Schema;         //import the Schema class

const userSchema = new Schema({         //make a new instance of Schema
    name: {type: String, required: true},
    email: {type: String, required: true},                      //define collection's fields & types
    username: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String}
});


const User = module.exports = mongoose.model('User', userSchema);   //export the schema as a module