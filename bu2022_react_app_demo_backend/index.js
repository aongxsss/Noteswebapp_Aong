const express = require('express')
const fs = require('fs');
var cors = require('cors');
const sessions = require('express-session');

const app = express()
const port = process.env.PORT || 5000

var path = require('path');

var visitors = 0;


var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));


app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

const oneDay = 1000 * 60 * 60 * 24;

app.use(
    sessions({
        key: "sessionId",
        secret: "putSomeSecretInHereSomeThingHardToGuess",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: oneDay,
        },
    })
);

const Users = require('./model/User');
const Notes = require('./model/Note');

//import Mongoose
const mongoose = require('mongoose');

const dbString = "mongodb+srv://pooh:01password@cluster0.lfxswgo.mongodb.net/TestDatabase?retryWrites=true&w=majority";

mongoose.connect(dbString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// mongoose
//     .connect(db, { useNewUrlParser: true })
//     .then(() => {
//         console.log('MongoDB Connected...')
//         // Users.find()
//         //     .then(items => console.log('item found', items));
//         var newUser = new Users({ name: 'Pol Pol', age: 80 });
//         newUser.save().then(user => {
//             console.log('user saved')
//         })
//     })
//     .catch(err => console.log(err));

app.get('/', (req, res) => {
    // Users.find()
    //     .then(items => console.log('item found', items));
    // var newUser = new Users({ name: 'Pol Pol', age: 80 });
    // newUser.save().then(user => {
    //     console.log('user saved')
    // })
    res.send('Hello New World Order')
})

app.post('/notes', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    const newNote = new Notes({ 
        id: req.body.id,
        note: req.body.note, 
        user: req.body.user, 
        color: req.body.color, 
        category : req.body.category, 
        date : req.body.date, 
    });
    newNote.save().then(() => {
        res.json({isError: false, message: 'save note success' })
    })
        .catch((error) => {
            res.json({isError: true, message: 'save note failed' })
        })
})


app.get('/notes',async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    try {
        const data = await Notes.find().select('-_id, -__v')
        res.json({isError: false, message: 'save note success', data })
    } catch (error) {
        res.json({isError: true, message: 'save note failed' })
    }
})

app.put('/notes/color',async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    try {
        const data = await Notes.updateOne(
            {
                id: req.body.id
            },
            {
                color: req.body.color,
            }
        )
        res.json({isError: false, message: 'save note success' })
    } catch (error) {
        res.json({isError: true, message: 'save note failed' })
    }
})


app.put('/notes/category',async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    try {
        const data = await Notes.updateOne(
            {
                id: req.body.id
            },
            {
                category: req.body.category,
            }
        )
        res.json({isError: false, message: 'update category success' })
    } catch (error) {
        res.json({isError: true, message: 'update category failed' })
    }
})

app.delete('/notes',async (req, res) => {
    console.log(req.body)
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    try {
        const data = await Notes.deleteOne(
            {
                id: req.body.id
            }
        )
        res.json({isError: false, message: 'delete note success' })
    } catch (error) {
        console.log(error)
        res.json({isError: true, message: 'delete note failed' })
    }
})

app.get('/users', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");

    Users.find().then(items => {
        // console.log('item found', items)
        const userList = []
        for (const userObj of Object.values(items)) {
            userList.push(userObj.user)
        }
        res.json(userList)
    });
})

app.get('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");

    console.log('request session', req.session)

    if (req.session.user) {
        res.json({ message: 'login sucesss', username: req.session.user })
    } else {
        res.json({ message: 'login failed' })
    }
})

app.post('/login', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    console.log('body', req.body)

    Users.find().then(users => {
        console.log('users found', users)
        const userList = []
        for (const userObj of Object.values(users)) {
            if ((userObj.user == req.body.submitData.username) && (userObj.password == req.body.submitData.password)) {
                console.log('login sucess')
                req.session.user = req.body.submitData.username
                req.session.save();
                res.json({ message: 'login sucesss', username: req.body.submitData.username })
            }
        }
    });
})

app.post('/register', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");

    console.log('body', req.body)

    var newUser = new Users({ user: req.body.submitData.username, password: req.body.submitData.password });
    newUser.save().then(user => {
        req.session.user = req.body.submitData.username
        req.session.save();
        res.json({ message: 'register user success' })
    })
        .catch(() => {
            res.json({ message: 'register user failed' })
        })
})

app.post('/logout', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");

    console.log('log out sesh', req.session)
    delete req.session["user"];
    req.session.save();
    res.status(201).json({ message: 'login out success', loggedIn: false })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

