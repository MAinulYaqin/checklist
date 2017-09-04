const bodyParser = require('body-parser')
const express = require('express')
const app = epxress()
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const PORT = 2017

// take this before handling server function.. !IMPORTANT
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/', express.static(__dirname + '/css'))

// then connect to database
mongoClient.connect('mongodb://ainul:insyaallah@ds151963.mlab.com:51963/checklist', (err, resutl) => {
    if (err) throw err

    app.post('/', (req, res) => {
        console.log(req.body)
    })
})

app.get('/', (req, res) => {
    res.render(__dirname + '/view/index.hbs')
})

app.listen(PORT, () => {
    console.log('magic happen at port 2017')
})