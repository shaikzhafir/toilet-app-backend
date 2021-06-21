const mongoose = require('mongoose')

const repliesSchema = new mongoose.Schema({
    replyText : {
        type: String,
        required : true
    },

    reviewID : {
        type: String,
        required: true
    },

    date : {
        type: Date,
        required : true
    }

})


module.exports = mongoose.model('replies', repliesSchema)