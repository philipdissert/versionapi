const mongoose = require('mongoose')

const apiKey = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        max:255,
        min: 6
    },
    apiKey: {
        type: String,
        required: true,
        max:255,
        min: 6
    },
})

module.exports = mongoose.model('ApiKey', apiKey)