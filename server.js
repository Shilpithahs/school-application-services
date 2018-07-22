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
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "access-control-allow-origin,content-type");
    next();
});

// Add user service
app.post('/user', (req, res) => {
    db.collection('users').save(req.body, (err, result) => {
    if(err) {
        console.log(err);
    } else {
        console.log('user saved to database');
    }
    })
})

// Get user service
app.get('/user', (req, res) => {
    db.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err)
    console.log(result);
    res.json(result);
    })
})

// Add Student service
app.post('/addSutudent', (req, res) => {
    db.collection('studentList').save(req.body, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            console.log('saved to database');
        }
    })
})

// Get all Student service
app.get('/getAllStudents', (req, res) => {
    db.collection('studentList').find().toArray((err, result) => {
        if(err) {
            console.log(err);
        } else {
            console.log(result);
            res.json(result);
        }
    })
})

// Add subject service
app.post('/addSubject', (req, res) => {
    console.log('req----------', req);
    db.collection('subjectList').save(req.body, (err, result) => {
        if(err) {
            console.log(err);
        } else {
            console.log('saved to database');
        }
    })
})

// Get all subject service
app.get('/getAllSubjects', (req, res) => {
    db.collection('subjectList').find().toArray((err, result) => {
        if(err) {
            console.log(err);
        } else {
            console.log(result);
            res.json(result);
        }
    })
})
