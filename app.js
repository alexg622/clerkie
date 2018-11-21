const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const transactionRoutes = require("./routes/transactionRoutes")
const url = "mongodb://localhost:27017/interview_challenge" // set mongoDB to 27017

// use bodyParser for json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// connect to mongoDB
mongoose.connect(url).then(() => console.log("mongoDB is connected")).catch(err => console.log(err))
mongoose.Promise = global.Promise

// make '/' transactionRoutes
app.use('/', transactionRoutes)

// set and listen for port 1984
const port = 1984
app.listen(port, () => console.log(`Server running on port ${port}`))
