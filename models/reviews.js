const mongoose = require('mongoose')

const reviewsSchema = new mongoose.Schema({
    reviewText : {
        type: String,
        required : true
    },

    toiletID : {
        type: String,
        required: true
    },

    date : {
        type: Date,
        require
    }

})


module.exports = mongoose.model('reviews', reviewsSchema)