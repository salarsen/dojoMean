const Team = require('mongoose').model('Team');

module.exports = {
   index(request,response){
      Team.find({})
         .then(function(teams){
            response.json(teams);
         })
         .catch(function(error){
            console.log(error);
            response.status(500).json(error);
         });
   },
   create(request,response){
      Team.create(request.body)
         .then(function(team){
            response.json(team);
         })
         .catch(function(error){
            console.log(error);
            respones.status(500).json(error);
         });
   },
   destroy(request,response){
      Team.remove({_id : request.params.id })
         .then(function(deletedObject){
            console.log(deletedObject);
            response.json(true);
         })
         .catch(function(error){
            response.status(500).json(error);
         });
   },
}
