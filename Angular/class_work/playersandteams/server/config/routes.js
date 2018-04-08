const path = require('path');
const PlayersController = require(path.resolve('server','controllers','players'));
const TeamsController = require(path.resolve('server','controllers','teams'));

module.exports = function(app){
   app.get('/players', PlayersController.index)
      .post('/players', PlayersController.create)
      .get('/players/:id',PlayersController.getOne)
      // .get('/players/:id/edit',PlayersController.editPlayer)
      .delete('/players/:id', PlayersController.destroy)

      .get('/teams', TeamsController.index)
      .post('/teams',TeamsController.create)
      .delete('/teams/:id',TeamsController.destroy)
};
