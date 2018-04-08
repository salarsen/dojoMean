const path = require('path');
const ninjaController = require(path.resolve('server','controllers','ninjas'));

module.exports = function(app){
   app.get('/ninjas', ninjaController.index)
      .get('/ninjas/:id',ninjaController.show)
      .post('/ninjas',ninjaController.create)
      .put('/ninjas/:id', ninjaController.update)
      .delete('ninjas/:id', ninjaController.delete);
}
