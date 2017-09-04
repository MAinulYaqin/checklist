'use strict';
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const join = require('path').join
const PORT = 2017

// take this before handling server function.. !IMPORTANT
app.use(bodyParser.urlencoded({
    extended: true
}))

// let db

// app.use('views', join(__dirname + 'view'))
// app.use('view engine', 'hbs')
app.use('/', express.static(__dirname + 'css'))

// then connect to database
// mongoClient.connect('mongodb://ainul:insyaallah@ds151963.mlab.com:51963/checklist', (err, database) => {
//     if (err) throw err

//     db = database
//     // yang ditaruh di naungan mongod adalah app.listen
// })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body)
})

app.listen(PORT, () => {
    console.log('magic happen at port 2017')
})