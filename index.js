const bodyParser = require('body-parser')
const express = require('express')
const app = epxress()
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

// take this before handling server function.. !IMPORTANT
app.use(bodyParser.urlencoded({
    extended: true
}))

// then connect to database
mongoClient.connect('mongodb://ainul:insyaallah@ds151963.mlab.com:51963/checklist', (err, resutl) => {
    if (err) throw err

    app.post('/', (req, res) => {
        console.log(req.body)
    })
})