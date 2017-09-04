'use strict';
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const join = require('path').join
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
const PORT = 2017

// take this before handling server function.. !IMPORTANT
app.use(bodyParser.urlencoded({
    extended: true
}))

let db

//setup view engine.. !IMPORTANT
app.set('views', join(__dirname + 'view'))
app.set('view engine', 'hbs')


app.use('/', express.static(__dirname + 'css'))

// then connect to database
mongoClient.connect('mongodb://ainul2:Insyaallah@ds151963.mlab.com:51963/checklist', (err, database) => {
    if (err) throw err

    db = database
    
    // yang ditaruh di naungan mongod adalah app.listen
    app.listen(PORT, () => {
        console.log('magic happen at port 2017')
    })
})

app.get('/', (req, res) => {
    res.render(__dirname + '/view/index.hbs')
})

app.post('/', (req, res) => {
    console.log(req.body)
})