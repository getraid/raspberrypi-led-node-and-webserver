const ConfigParser = require("configparser");
const fs = require("fs");

const config = new ConfigParser();
if (fs.existsSync("config.ini")) {
  config.read("config.ini");
} else {
  // no config file found, generate defaults
  config.addSection("Config");
  config.set("Config", "LED_GPIO_PIN_RED", 27);
  config.set("Config", "LED_GPIO_PIN_RED", 22);
  config.set("Config", "LED_GPIO_PIN_BLUE", 17);
  config.set("Config", "VerboseLogging", false);
  config.set("Config", "DebugWithoutGPIO", false);
  config.write("config.ini");
  console.warn("Wrote default settings to config.ini. \nPlease change/verify them and relaunch application");
  process.exit();
}

//ports
var wssPort = 3000;
var websPort = 80;

var x = config.get("Config", "DebugWithoutGPIO");
if (config.get("Config", "DebugWithoutGPIO").toLowerCase() === "false") {
  //pigpio
  var Gpio = require("pigpio").Gpio;

  //red-led
  var led1 = new Gpio(parseInt(config.get("Config", "LED_GPIO_PIN_RED")), { mode: Gpio.OUTPUT });

  //green-led
  var led2 = new Gpio(parseInt(config.get("Config", "LED_GPIO_PIN_GREEN")), { mode: Gpio.OUTPUT });

  //blue-led
  var led3 = new Gpio(parseInt(config.get("Config", "LED_GPIO_PIN_BLUE")), { mode: Gpio.OUTPUT });
}
//websocket server listen port 3000
var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({
  port: wssPort,
});
CLIENTS = [];

//Webserver objekte
var express = require("express");
const { type } = require("express/lib/response");
var app = express();
var path = require("path");
const { exit } = require("process");
const { application } = require("express");

//----------v webserver v-------------------------

//definiert den start/suchpunkt für express
app.use(express.static(__dirname));

//sendet die html datei
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

console.log("Webserver started on port: " + websPort);
console.log("WebSocketServer started on port: " + wssPort);

//----------v socketserver v-------------------------

//wss = websocketserver selbst
//ws = websocketserver zu client verbindung

// connection = beim connetecten wird die prozedur aufgerufen
// die individuelle verbindung(session) ist in ws gespeichert
wss.on("connection", function connection(ws) {
  //add new connection to list
  CLIENTS.push(ws);
  ws.id = getRandomInt(50);

  //serverside send on open:
  ws.send("Server-Message");
  console.log("Client joined");
  console.log("Current clients:" + CLIENTS.length);
  console.log("Client " + ws.id);

  //serverside recive
  ws.on("message", function incoming(message) {
    var obj = JSON.parse(message);

    //hier werte ausschließen(ist int && nicht <0 und >255)
    if (Number.isInteger(obj.r) && Number.isInteger(obj.g) && Number.isInteger(obj.b)) {
      if (obj.r < 256 && obj.g < 256 && obj.b < 256 && obj.r >= 0 && obj.g >= 0 && obj.b >= 0) {
        if (config.get("Config", "DebugWithoutGPIO").toLowerCase() === "false") {
          //hier übergabe
          led1.pwmWrite(obj.r);
          led2.pwmWrite(obj.g);
          led3.pwmWrite(obj.b);
        }

        if (GetVerbooseLoggingEnabled()) {
          console.log("Client " + ws.id + ": " + obj.r + ", " + obj.g + ", " + obj.b);
        }
      } else {
        console.log("Smaller than 0 or bigger than 255");
      }
    } else {
      console.log("Sent package is out of bounds. Only valid RGB values accepted (0-255)");
    }
  });

  //send on close-connection
  ws.on("close", function () {
    ws.close();
    console.log("closing connection");
    CLIENTS.pop(ws);
  });

  ws.on("error", console.error);
});

//webserver listen
app.listen(websPort);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function GetVerbooseLoggingEnabled() {
  return config.get("Config", "VerboseLogging").toLowerCase() === "true";
}
