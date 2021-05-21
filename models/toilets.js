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
    },

    image_url : {
        type : String,
        required : false,
        default : 'https://i.guim.co.uk/img/media/80ec165be749a30354f65b263f5fd58d36731070/0_376_5613_3368/master/5613.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=bbee1e36ed85411e0e1be219d50c82a2'
    }



})


module.exports = mongoose.model('toilets', toiletsSchema)