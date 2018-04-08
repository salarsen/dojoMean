const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const reg = new RegExp('\\.js$', 'i');

const modelsPath = path.resolve('server','models');

mongoose.connect('mongodb://localhost/books_and_more_books');
mongoose.connection.on('connected',() => console.log('connected to mongodb'));

mongoose.Promise = global.Promise;

fs.readdirSync(modelsPath).forEach(file => {
    // if(file.indexOf('.js') > 0)
    if(reg.test(file)){
        require(path.join(modelsPath,file))
    }
});