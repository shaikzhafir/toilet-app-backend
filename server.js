require('dotenv').config() 
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//allows express to parse json files 
app.use(express.json())
app.listen(4000, () => console.log('lala'))


mongoose.connect(process.env.ATLAS_DATABASE_URL, {useNewUrlParser : true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.on('open',() => console.log('connected to db'))

//handles routes to /toilets
const toiletsRoute = require('./routes/toilets')
app.use('/api/toilets',toiletsRoute)

// handle routes to /reviews
const reviewsRoute = require('./routes/reviews')
app.use('/api/reviews', reviewsRoute)



