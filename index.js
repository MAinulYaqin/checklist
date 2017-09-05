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

//setup view engine.. !IMPORTANT
app.set('view engine', 'ejs')
app.set('views', join(__dirname + '/view'))

// setup directory
app.use('/', express.static(__dirname + '/css'))


let db
// then connect to database
mongoClient.connect('mongodb://ainul:Insyaallah@ds151963.mlab.com:51963/checklist', (err, database) => {
    if (err) throw err


    db = database
    // yang ditaruh di naungan mongod adalah app.listen
    app.listen(PORT, () => {
        console.log('magic happen at port 2017')
    })
})

app.get('/', (req, res) => {
    db.collection('checklist').find().toArray((err, result) => {
        if (err) throw err
        
        console.log(result)
        res.render(__dirname + '/view/index.ejs', {
            quotes: result
        })
    })
})

app.get('/isi', (req, res) => {
    var cursor = db.collection('checklist').find().toArray((err, result) => {
        console.log(result)
    })

    console.log(cursor)

    res.send('wait until i get the problem').send(cursor)
})

app.post('/quotes', (req, res) => {
    db.collection('checklist').save(req.body, (err, result) => {
        if (err) throw err

        res.redirect('/')
        // console.log('save to database')
    })
})