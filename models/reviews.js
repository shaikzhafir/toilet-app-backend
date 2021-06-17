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
        required : true
    },


    rating : {
        type : Number,
        required : true
    }

})


module.exports = mongoose.model('reviews', reviewsSchema)