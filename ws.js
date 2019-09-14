//ports
var wssPort = 3000;
var websPort = 80;

//pigpio
var Gpio = require("pigpio").Gpio;

//red-led
var led1 = new Gpio(27, {
	mode: Gpio.OUTPUT
});

//green-led
var led2 = new Gpio(22, {
	mode: Gpio.OUTPUT
});

//blue-led
var led3 = new Gpio(17, {
	mode: Gpio.OUTPUT
});



//websocket server listen port 3000
var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({
	port: wssPort
});
CLIENTS = [];


//Webserver objekte
var express = require('express');
var app = express();
var path = require('path');

//----------v webserver v-------------------------

//definiert den start/suchpunkt für express
app.use(express.static(__dirname));

//sendet die html datei
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});


//----------v socketserver v-------------------------

//wss = websocketserver selbst
//ws = websocketserver zu client verbindung


// connection = beim connetecten wird die prozedur aufgerufen
// die individuelle verbindung(session) ist in ws gespeichert
wss.on('connection', function connection(ws) {

	//add new connection to list
	CLIENTS.push(ws);
	ws.id = getRandomInt(50);


	//serverside send on open:
	ws.send('Server-Message');
	console.log("Client joined");
	console.log("Current clients:" + CLIENTS.length);
	console.log("Client " + ws.id);

	//serverside recive 
	ws.on('message', function incoming(message) {
		var obj = JSON.parse(message);

		//hier werte ausschließen(ist int && nicht <0 und >255)
		if (Number.isInteger(obj.r) && Number.isInteger(obj.g) && Number.isInteger(obj.b)) {
			if ((obj.r < 256 && obj.g < 256 && obj.b < 256) && (obj.r >= 0 && obj.g >= 0 && obj.b >= 0)) {
				//hier übergabe 
				led1.pwmWrite(obj.r);
				led2.pwmWrite(obj.g);
				led3.pwmWrite(obj.b);

				// console.log("Client " + ws.id + ": " + obj.r +", "+ obj.g +", "+ obj.b);
			} else {
				console.log("Smaller than 0 or bigger than 255")
			}
		} else {
			console.log("Something isn't a integer...feelsbadman")
		}

	});

	//send on close-connection
	ws.on('close', function () {
		ws.close();
		console.log('closing connection');
		CLIENTS.pop(ws);
	});

	ws.on('error', console.error);
});


//webserver listen
app.listen(websPort);


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}