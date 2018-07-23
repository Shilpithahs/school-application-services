const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient;

DATABASE_URL = 'mongodb://localhost:27017/codingDB';
MongoClient.connect(DATABASE_URL, { useNewUrlParser: true }, (err, database) => {
    if(err) {
        console.log(err);
    } else {
        db = database.db('codingDB') // your database name
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
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers, Access-Control-Allow-Origin, Content-Type");
    res.header("Access-Control-Request-Headers","Access-Control-Allow-Headers, Access-Control-Allow-Origin, Content-Type");
    next();
});

// Add user service
app.post('/registerUser', (req, res) => {
    db.collection('userList').save(req.body, (err, result) => {
        if(err) {
            console.log('error in saving to database');
            return err;
        } else {
            console.log('user saved to database');
            res.send(result.ops);
            return result.ops;
        }
    })
})

// Get user service
app.get('/getAllUsers', (req, res) => {
    db.collection('userList').find().toArray((err, result) => {
        if(err) {
            return err;
        } else {
            res.send(result);
            return result;
        }
    })
})

// Add Student service
app.post('/addStudent', (req, res) => {
    db.collection('studentList').save(req.body, (err, result) => {
        if(err) {
            return err;
        } else {
            console.log('student saved to database');
            res.send(result.ops);
            return result.ops;
        }
    })
})

// Get all Student service
app.get('/getAllStudents', (req, res) => {
    db.collection('studentList').find().toArray((err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
            return result;
        }
    })
})

// Add subject service
app.post('/addSubject', (req, res) => {
    db.collection('subjectList').save(req.body, (err, result) => {
        if(err) {
            return err;
        } else {
            console.log('subject saved to database');
            res.send(result.ops);
            return result.ops;
        }
    })
})

// Get all subject service
app.get('/getAllSubjects', (req, res) => {
    db.collection('subjectList').find().toArray((err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
            return result;
        }
    })
})

app.delete('/deleteStudent', (req, res) => {
    db.collection('studentList').findOneAndDelete(req.body, (err, result) => {
        if(err) {
            console.log('err-----', err);
            return err;
        } else {
            console.log('student deleted from database');
            res.send(result.ops);
            return result.ops;
        }
    })
})

app.put('/updateStudent', (req, res) => {
    db.collection('studentList').findOneAndUpdate({id: req.body.id}, 
        {$set: 
            {
                email: req.body.email, 
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone: req.body.phone,
                standard: req.body.standard,
                subject: req.body.subject
            }
        }, (err, result) => {
        if(err) {
            return err;
        } else {
            console.log('student updated from database');
            res.send(result.ops);
            return result.ops;
        }
    })
})

app.get('/getStudentByEmailID', (req, res) => {
    db.collection('studentList').find().toArray((err, result) => {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
            return result;
        }
    })
})