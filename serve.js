var express = require('express');
var app = express();


app.use(function (req, res, next) {
  console.log(req.url);
  next();
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
