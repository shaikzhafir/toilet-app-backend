const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.listen(3000, () => console.log('lala'))



let DATABASE_URL = "mongodb://localhost/toilet-app"

mongoose.connect(DATABASE_URL, {useNewUrlParser : true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.on('open',() => console.log('connected to db'))


const toiletsRoute = require('./routes/toilets')

app.use('/toilets',toiletsRoute)



