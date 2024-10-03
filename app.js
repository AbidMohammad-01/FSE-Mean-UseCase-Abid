const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors');
app.use(cors())
const DB_URL=process.env.MONGO_DB_URL
console.log('url',DB_URL)
mongoose.connect(DB_URL)
.then(()=>{console.log('Connected');})
.catch((err)=>{console.log('Error',err);})

const movieApp = require('./APIs/movie.api')
const userApp = require('./APIs/user.api')
const ticketApp = require('./APIs/ticket.api')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/v1.0/moviebooking',movieApp)
app.use('/api/v1.0/moviebooking',userApp)
app.use('/api/v1.0/moviebooking',ticketApp)
app.listen(process.env.PORT,()=>{
   console.log( "Hi from Abid")
})
