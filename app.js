const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const db = require('./.git/keys').mongoURI

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

mongoose.connect(db).then(() => console.log("mongoDB is connected")).catch(err => console.log(err))

app.get('/test', (req, res) => res.send("Working"))

const port = 1984

app.listen(port, () => console.log(`Server running on port ${port}`))
