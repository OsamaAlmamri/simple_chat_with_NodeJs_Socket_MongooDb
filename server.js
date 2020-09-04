'use strict';

const express = require('express');
const http    = require('http');
const socket  = require('socket.io');

const SocketServer = require('./socket');
class Server{
	constructor()
	{
		this.port = 5000;
		this.host = 'localhost';
		this.app = express();
		this.http = http.Server(this.app); // Node Js Server 
		this.socket = socket(this.http,false);  // Here Run a Socket io Module
	}
	runServer()
	{
		new SocketServer(this.socket).socketConnection(); // This Is socket Class
		/* Listening A node Js Server */
		this.http.listen(this.port,this.host,()=>{
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
var students = [
	{
		name: 'osama',
		age: 24,
		img: '1.jpg',
		about: 'ciu cbudsbx n cu bn ubcubuewdo   min  c iwd i  buj buewb beu'
	},
	{
		name: 'ali',
		age: 21,
		img: '2.jpg',
		about: 'ciu cbudsbx n cu bn ubcubuewdo   min  c iwd i  buj buewb beu'
	},
	{
		name: 'salah',
		age: 20,
		img: '3.jpeg',
		about: 'ciu cbudsbx n cu bn ubcubuewdo   min  c iwd i  buj buewb beu'
	},
	{
		name: 'mohammed',
		age: 27,
		img: '4.png',
		about: 'ciu cbudsbx n cu bn ubcubuewdo   min  c  iwd i  buj buewb beu'
	},
	{
		name: 'osama',
		age: 24,
		img: '1.jpg',
		about: 'ciu cbudsbx n cu bn ubcubuewdo   min  c iwd i  buj buewb beu'
	},
	{
		name: 'ali',
		age: 21,
		img: '2.jpg',
		about: 'ciu cbudsbx n cu bn ubcubuewdo   min  c iwd i  buj buewb beu'
	},
]
app.app.get('/home', function (req, res) {
	res.render(__dirname + '/views/index.ejs', {students: students})
});
app.app.get('/', function (req, res) {
	res.redirect('/home');
});

app.runServer(); // Run The Server Class
