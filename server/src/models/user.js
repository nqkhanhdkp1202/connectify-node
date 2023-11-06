const mongoose = require('mongoose')
const {schemaOptions} = require('./modelOption')

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        require: true,
        unique: true,
    },
    fullName : {
        type: String,
        require: true,
    },
    address: {
        type: String
    },
    userName: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }
}, schemaOptions)

module.exports = mongoose.model('User', userSchema);