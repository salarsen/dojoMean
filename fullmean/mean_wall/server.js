const express = require('express');
const parser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

const sessionConfig = {
   secret : 'TheCookieMonsterLovesCookies',
   resave : false,
   saveUninitialized : true,
   name : 'myAppCookie',
   cookie : {
      secure : false,
      httpOnly : false,
      maxAge : 3600000,
   }
};

app.use(express.static(path.resolve('client')));
app.use(express.static(path.resolve('bower_components')));

app.use(cookieParser('cookieParser'));
app.use(parser.json());
app.use(session(sessionConfig));

require(path.resolve('server','config','db'));

require(path.resolve('server','config','routes'))(app);

app.listen(port, function(){
   console.log(`Server is listening on port ${port}`);
});
