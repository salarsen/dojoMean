const express = require('express');
const path = require('path');
const parser = require('body-parser');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('bower_components')));

app.use(parser.urlencoded({ extended : true }));
app.use(parser.json());

require(path.resolve('server','config','db'));
require(path.resolve('server','config','routes'))(app);


app.listen(port, function(){
   console.log(`Listening on port ${port}`);
});
