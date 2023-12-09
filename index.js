// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var requestIp = require('request-ip');
var accepts = require('accepts');
var UAParser = require('ua-parser-js');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(requestIp.mw());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', function (req, res) {
  var ipaddress = req.clientIp;
  var language = accepts(req).languages()[0] || 'en-US'; // Default to 'en-US' if language is not provided

  // Parse user agent string using ua-parser-js
  var userAgent = req.headers['user-agent'];
  var parser = new UAParser();
  var result = parser.setUA(userAgent).getResult();
  var software = result.browser.name + ' ' + result.browser.version;

  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
