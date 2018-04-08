require('dotenv').load();

var express = require('express');
var parser = require('body-parser');
var path = require('path');
var app = express();
var port = process.env.PORT || 8000;

app.use(express.static(path.resolve('client')));
app.use(parser.urlencoded({ extended: true }));

app.set('views', path.resolve('views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  console.log('root route');
  response.render('index');
});
app.post('/results', function(request, response) {
  console.log(request.body);
  response.render('result', { information: request.body });
});

app.listen(port, function() {
  console.log(`server listening on port ${port}`);
});
