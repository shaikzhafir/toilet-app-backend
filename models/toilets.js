const mongoose = require('mongoose')

const toiletsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true

    },

    location : {
        type : String,
        required : true,
        default : 'NTU'
    },

    lat : {
        type : Number,
        required : true
    },

    lng : {
        type : Number,
        required : true
    },

    rating : {
        type : Number,
        required : true

    },

    hasBidet : {
        type : Boolean,
        required : true,
        default : false
    }



})


module.exports = mongoose.model('toilets', toiletsSchema)