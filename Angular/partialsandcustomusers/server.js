const express = require('express'),
      parser = require('body-parser'),
      path = require('path'),
      port = process.env.PORT || 8000,
      app = express();

app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('bower_components')));

app.use(parser.json());

app.listen(port, function(){
   console.log(`Listening on port ${port}`);
});
