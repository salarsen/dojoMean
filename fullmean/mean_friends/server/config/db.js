const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const model_path = path.resolve('server','models');
const reg = new RegExp('.js$','i');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/file_structure_simple_server");

mongoose.connection.on("connected",function(){
   console.log(`Connected to MongoDB`);
});


process.on('SIGINT', function(){
   mongoose.connection.close(function(){
      console.log(`Mongoose default connection closed`);
      process.exit(0);
   });
});

fs.readdirSync(model_path).forEach(function(file){
   if(reg.test(file)){
      require(path.join(model_path,file));
   }
});
