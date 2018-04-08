const Friend = require('mongoose').model('Friend');

module.exports = {
   index : function(request, response){
      Friend.find({})
         .then(function(friends){
            response.json(friends);
         })
         .catch(function(error){
            console.log(error);
            response.status(500).json(error);
         });
   },
   create : function(request, response){
      Friend.create(request.body)
         .then(function(friend){
            response.json(friend);
         })
         .catch(function(error){
            console.log(error);
            response.status(500).json(error);
         });
   },
   update : function(request, response){
      Friend.findByIdAndUpdate(request.params.id, request.body, { new : true })
         .then(function(friend){
            response.json(friend);
         })
         .catch(function(error){
            console.log(error);
            response.status(500).json(error);
         });
   },
   delete : function(request, response){
      Friend.remove({_id : request.params.id })
         .then(function(deletedObject){
            console.log(deletedObject);
            response.json(true);
         })
         .catch(function(error){
            console.log(error);
            response.status(500).json(error);
         });
   },
   show : function(request, response){
      Friend.findById(request.params.id)
         .then(function(friend){
            response.json(friend);
         })
         .catch(function(error){
            console.log(error);
            response.status(500).json(error);
         });
   },
}
