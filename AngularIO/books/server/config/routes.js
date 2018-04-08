const bookController = require('../controllers/books');
const authController = require('../controllers/auth');
const path = require('path')

module.exports = function(app){
    app
        .get('/api/books', bookController.index)
        .post('/api/books', bookController.create)
        .get('/api/books/:book_id', bookController.show)
        .put('/api/books/:book_id', bookController.update)
        .delete('/api/books/:book_id', bookController.destroy)

        .post('/auth/login', authController.login)
        .post('/auth/register', authController.register)
        .delete('/auth/logout', authController.logout)

        .all('*',function(request, response){
            response.sendFile(path.resolve('dist','index.html'));
        });
};
