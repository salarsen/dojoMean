const express = require('express');
const parser = require('body-parser');
const port = process.env.PORT || 8000;
const path = require('path');

const app = express();

app.use(express.static(path.resolve('bower_components')));
app.use(express.static(path.resolve('client')));
app.use(parser.json());

app.listen(port,function(){
   console.log(`Listening on port ${port}`);
});
