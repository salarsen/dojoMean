const express = require('express');
const parser = require('body-parser');
const port = process.env.PORT || 8000;
const path = require('path');

const app = express();

app.use(express.static(path.resolve('bower_components')));
app.use(express.static(path.resolve('client')));
app.use(parser.json());

var animals = [
   {
      species: 'horse',
      move : 'walking',
   },
   {
      species : 'Bat',
      move : 'fly',
   },
   {
      species : 'Goat',
      move : 'run',
   }
];

app.get('/animals',function(request,response){
   response.json({ animals : animals});
});

app.listen(port,function(){
   console.log(`Listening on port ${port}`);
});
