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
app.use(bodyParser.json())

//setup view engine.. !IMPORTANT
app.set('view engine', 'ejs')
app.set('views', join(__dirname + '/view'))

// setup directory
app.use('/', express.static(__dirname + '/css'))
app.use('/', express.static(__dirname + '/js'))


let db
// then connect to database
mongoClient.connect('mongodb://ainul:Insyaallah@ds151963.mlab.com:51963/checklist', (err, database) => {
    if (err) throw err
    // yang ditaruh di naungan mongod adalah app.listen
    db = database
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

        // res.redirect('/')
        // console.log('save to database')
    })
})

// Update, first params is query, then update, option, and callback
app.put('/quotes', (req, res) => {
    db.collection('checklist').findOneAndUpdate({
        // query
        name: 'Ainul'
    }, {
        // update
        $set: {
            name: req.body.name,
            option: req.body.option
        }
    }, {
        // option
        sort: {
            _id: -1
        },
        upsert: true
    }, (err, result) => {
        //callback
        if (err) return res.send(err)
        
        console.log(result)
    })
})

// delete doesn;t work, i dont know why
app.delete('/quotes', (req, res) => {
    db.collection('checklist').findOneAndDelete({
        name: req.body.name
    }, (err, result) => {
        if (err) throw err

        res.send({
            message: 'Deleted'
        })
    })
})
