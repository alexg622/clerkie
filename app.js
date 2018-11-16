const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
// const db = require('./.git/keys').mongoURI
const transactionRoutes = require("./routes/transactionRoutes")
const url = "mongodb://localhost:27017/interview_challenge";

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(url).then(() => console.log("mongoDB is connected")).catch(err => console.log(err))
mongoose.Promise = global.Promise

app.use('/', transactionRoutes)

const port = 1984
app.listen(port, () => console.log(`Server running on port ${port}`))
