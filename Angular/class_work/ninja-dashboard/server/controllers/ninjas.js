const ninja = require('mongoose').model('ninja');

module.exports = {
   index : function(request,response){
      ninja.find({}, (error, ninjas) => {
         if(error){
            return response.status(500).json(error);
         }
         console.log('results',ninjas);
         response.json({ success : true, ninjas});
      });
   },
   create: function(request,response){
      ninja.create(request.body)
         .then(ninja => {
            response.json({ success : true, ninja});
         })
         .catch(error => {
            response.status(500).json(error);
         });
   },
   show: function(request,response){
      ninja.findById(request.params.id)
         .then(function(ninja){
            // console.log('ninja',ninja);
            response.json({ success: Boolean(ninja), ninja });
         })
         .catch(function(error){
            response.status(500).json({ success: false, error });
         });
   },
   update: function(request,response){

   },
   delete: function(request,response){

   }
}
