const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const model_path = path.resolve('server','models');

//test for file str, case insensitive
const reg = new RegExp('.js$','i');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/ninja-dashboard');

mongoose.connection.on('connected', () => {
   console.log(`mongoose connected`);
})

//signal interrupt - crtl C, will break out of mongoose connection
process.on('SIGINT', () => {
   mongoose.connection.close(() => {
      console.log(`Mongoose default connection disconnected through program termination`);
      process.exit(0);
   })
})

fs.readdirSync(model_path).forEach(file => {
   if(reg.test(file)){
      require(path.join(model_path,file));
   }
});
