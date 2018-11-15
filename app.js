const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/test', (req, res) => res.send("Working"))

const port = 1984

app.listen(port, () => console.log(`Server running on port ${port}`))
