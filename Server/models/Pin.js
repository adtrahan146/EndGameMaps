const mongoose = require('mongoose');   //import mongoose module
const Schema = mongoose.Schema;  

const pinSchema = new Schema({
    pinName: String,
    pinLocation: String,
    pinCategory: String,
    comments: String
})

const Pin = module.exports = mongoose.model('Pin', pinSchema);