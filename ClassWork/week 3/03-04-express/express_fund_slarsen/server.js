require('dotenv').load();

var express = require('express');
var parser = require('body-parser');
var path = require('path');

var app = express();

var port = process.env.PORT || 8000;

// app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.resolve('client')));
/*
    resolve returns absolute path
    a/
        b/
        c/

    d/
    path.join(a, b, .., d);
    => a/b/../d
    path.resolve(a,b,,..,d);
    => a/d
*/
app.use(parser.urlencoded({ extended : true }));

app.set('views', path.resolve('views'));
app.set ('view engine', 'ejs');

app.get('/',function(request,response){
    response.render('index');
});

app.post('/results', function(request,response){
    console.log(request.body);
    response.render('results', {information : request.body});
});

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
})
