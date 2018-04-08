const express = require('express');
const parser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;

const app = express();

const sessionConfig = {
    saveUninitialized : true, //auto-creates cookie on visit
    secret : 'SessionSecret',
    resave : false, //does not resave if no changes are made
    name: 'session',
    rolling : true, //give cookie an expiration time, updates cookie expiration
    cookie : {
        secure : false,
        httpOnly: false,
        maxAge: 360000,
    }
};

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cookieParser('adfdfskjttketnrdtjkdsnlfsdkfdslkfdsdfsdf'));
app.use(session(sessionConfig));
app.use(express.static(path.resolve(__dirname, 'dist')));

require('./server/config/database');
require('./server/config/routes')(app);


app.listen(port, () => console.log(`listening on port ${port}`));