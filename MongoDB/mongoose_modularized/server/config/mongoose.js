const mongoose = require('mongoose');

const fs = require('fs');

const path = require('path');

mongoose.connect('mongodb://localhost/introtomongo');

mongoose.connection.on('connected', function(){
    console.log('mongodb connect');
});

mongoose.Promise = global.Promise;

// var models_path = path.join(__dirname, './../models');
var model_path = path.resolve('server','models')

fs.readdirSync(models_path).forEach(function(file) {
   if(file.indexOf('.js') >= 0) {
      // require the file (this runs the model file which registers the schema)
      require(models_path + '/' + file);
   }
});
