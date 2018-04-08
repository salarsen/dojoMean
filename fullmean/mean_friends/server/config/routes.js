const path = require('path');

const friendsController = require(path.resolve('server','controllers','friends'));

module.exports = function(app){
   app.get('/friends', friendsController.index)
      .get('/friends/:id', friendsController.show)
      .post('/friends', friendsController.create)
      .put('/friends/:id',friendsController.update)
      .delete('/friends/:id',friendsController.delete);
};
