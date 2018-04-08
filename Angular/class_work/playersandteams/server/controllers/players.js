const Player = require('mongoose').model('Player');

module.exports = {
   index(request,response){
      Player.find({})
         .then(function(players){
            response.json(players);
         })
         .catch(function(error){
            console.log(error);
            response.status(500).json(error);
         });
   },
   getOne(request,response){
      Player.findById(request.params.id)
         .then(function(player){
            response.json(player);
         })
         .catch(function(error){
            console.log(error);
            response.status(500).json(error);
         });
   },
   create(request,response){
      // console.log('players',request.body);
      Player.create(request.body)
         .then(function(player){
            response.json(player);
         })
         .catch(function(error){
            console.log(error);
            respones.status(500).json(error);
         });
   },
   destroy(request,response){
      Player.remove({_id : request.params.id })
         .then(function(deletedObject){
            console.log(deletedObject);
            response.json(true);
         })
         .catch(function(error){
            response.status(500).json(error);
         });
   },
}
