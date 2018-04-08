const express = require('express');
const parser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8111;

const app = express();

/* ---------------- Setup Here --------------- */
// app.use(express.static(path.resolve('./client/static')));
app.use(express.static(path.join(__dirname,'./client/static')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

// app.set('views', path.resolve('./client/views'));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine','ejs');

require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');

routes_setter(app);

/* ------------- App Listen Here --------------- */
app.listen(port,function(){
    console.log(`Listening on port ${port}`)
})
