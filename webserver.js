//===============Setting up HTTP server to server html================
var http = require('http');
var fs = require('fs');

var html = fs.readFileSync('test.html');
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

setInterval(function(){
	var temp = getCurrentTemp();
	var time = moment.tz('Asia/Kuala_Lumpur').format('HH:mm:ss');
	updateDatabase(tempDataStore,temp,time);
},1000);

function getCurrentTemp(){
	return ((100*Math.random()%20) + 20);
}
function updateDatabase(dataStore,currentTemp,currentDate){
	dataStore.child(currentDate).set(
			{"Temperature":currentTemp}
		);
}