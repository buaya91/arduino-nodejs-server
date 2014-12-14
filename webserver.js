//===============Setting up HTTP server to server html================
var http = require('http');
var fs = require('fs');
//var Galileo = require("galileo-io");
//var board = new Galileo();

var html = fs.readFileSync('index.html');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}).listen("80","127.0.0.1");
console.log('Server running at http://127.0.0.1:8124/');

//================Set up of HTTP server done===============================



// create a function getTemp() that read from analog pin, return temperature in Celsius degree
// create an event that fire getTemp() every n seconds 
// create a callback that attach to the event and set the temperature to firebase


var Firebase = require('firebase');
var tempDataStore = new Firebase('https://gen-homework.firebaseio.com/');
tempDataStore = tempDataStore.child('server-temperature').child(process.argv[2]);
var moment = require('moment-timezone');
var degreecelsius;

setInterval(function(){
	var temp = getCurrentTemp();
	//var time = moment.tz('Asia/Kuala_Lumpur').format('HH:mm:ss');
	var time = Date.now();
	//var temp = degreecelsius;
	updateDatabase(tempDataStore,temp,time);
},1000);

// board.analogRead("A0", function(data) {
//   //console.log(data* 0.48828125);
//     degreecelsius = data;
// });

function getCurrentTemp(){
	return ((100*Math.random()%7) + 30);
}

function updateDatabase(dataStore,currentTemp,currentDate){
	dataStore.child(currentDate).set(
			{"Temperature":currentTemp}
		);
}