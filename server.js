'use strict';

const express = require('express');
const http = require('http');
const socket = require('socket.io');
const session = require('express-session');
const flashSession=require('connect-flash');
const SocketServer = require('./socket');
class Server {
    constructor() {
        this.port = 5000;
        this.host = 'localhost';
        this.app = express();
        this.http = http.Server(this.app); // Node Js Server
        this.socket = socket(this.http, false);  // Here Run a Socket io Module
    }

    runServer() {
        new SocketServer(this.socket).socketConnection(); // This Is socket Class
        /* Listening A node Js Server */
        this.http.listen(this.port, this.host, () => {
            console.log(`the server is runing at http://${this.host}:${this.port}`);
        });
        /* Listening A node Js Server */
    }
}
const app = new Server();
const path = require("path");
const bodyParser = require("body-parser");
app.app.set("view engine", "ejs");
app.app.set("views", "views");
app.app.use("/assest", express.static(path.join(__dirname, "assest")));
app.app.use(bodyParser.urlencoded({limit: "5000mb", extended: true}));
app.app.use(flashSession())
app.app.use(session({
    secret: 'this is key secret to ecncrypt my session in mongo db -osama mohammmed-',
    saveUninitialized: false,
    resave: false,
    cookie: {
        /* expires*/  maxAge: 1 * 60 * 60 * 100 * 1000//milliSecond
    },
    // store: STORE
}))
var users = [
    {
        id: 1,
        name: 'osama',
        username: 'osama',
        password: '123',
        img: '1.jpg',

    },
    {
        id: 2,
        name: 'ali',
        img: '2.jpg',
        username: 'ali',
        password: '123'
    },
    {
        id: 3,
        name: 'salah',
        img: '3.jpeg',
        username: 'salah',
        password: '123'
    },
    {
        id: 4,
        name: 'mohammed',
        img: '4.png',
        username: 'mohammed',
        password: '123'
    }
]
app.app.get('/home', function (req, res) {
    if (req.session.user_id) {
        res.render(__dirname + '/views/index.ejs', {currentUser: users[req.session.user_id], users: users,success: req.flash('success')})
    } else {
        res.redirect('/login');
    }
});
app.app.get('/', function (req, res) {
    res.redirect('/home');

});
app.app.get('/login', (req, res) => {
    res.render(__dirname + '/views/login.ejs',{errors: req.flash('errors')})
})

app.app.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
    })
    res.redirect('/home');
})

app.app.post('/postLogin', (req, res) => {
    var id = users.findIndex(user => (user.username === req.body.username & user.password === req.body.password));
    console.log(id);
    if (id === -1) {
        req.flash('errors',['اسم المستخدم او كلمة السر خطاء']) ;
        res.redirect('/login');
    } else {
        req.session.user_id = id;
        req.flash('success',['تم الدخول بنجاح']) ;
        res.redirect('/home');
    }
})


app.runServer(); // Run The Server Class
