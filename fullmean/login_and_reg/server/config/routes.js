const path = require('path');

const Auth = require(path.resolve('server','controllers','auth'));

module.exports = function(app){
   app
   .post('/login', Auth.login)
   .post('/register', Auth.register)
   .delete('/logout/:id', Auth.logout)
   .get('/user/:id', Auth.getUser);
};
