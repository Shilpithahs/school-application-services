const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

DATABASE_URL = 'mongodb://Shilpitha15:shil_mlab_15@ds243491.mlab.com:43491/m-lab-db';
MongoClient.connect(DATABASE_URL, { useNewUrlParser: true }, (err, database) => {
    if(err) {
        console.log(err);
    } else {
        db = database.db('m-lab-db') // your database name
        app.listen(3000, () => {
            console.log('listening on 3000')
        })
    }
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "access-control-allow-origin,content-type");
    next();
});

app.post('/user', (req, res) => {
    console.log('user req---------', req);
    console.log('---------------------------');
    db.collection('users').save(req.body, (err, result) => {
    if(err) {
        console.log(err);
    } else {
        console.log('user saved to database');
    }
    })
})

app.get('/user', (req, res) => {
    db.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result);
    res.json(result);
    })
})

app.post('/studentList', (req, res) => {
    console.log('req---------', req);
    console.log('---------------------------');
    db.collection('studentList').save(req.body, (err, result) => {
    if(err) {
        console.log(err);
    } else {
        console.log('saved to database');
    }
    })
})

app.get('/getAll', (req, res) => {
    db.collection('studentList').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result);
    res.json(result);
    })
})
