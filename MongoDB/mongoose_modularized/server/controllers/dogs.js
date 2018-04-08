var mongoose = require('mongoose');
var Dog = mongoose.model('Dog');

module.exports = {
   show: function(request,response){
      console.log(`Route: ${request.url}`);
      Dog.find({})
          .then(function(dogs){
             console.log(dogs);
             response.render('index',{dogs});
          })
          .catch(function(error){
             response.json(error)
          });
   },
   new: function(request,response){
       console.log(`Route: ${request.url}`);
       response.render('new');
   },
   add: function(request,response){
      console.log(`Route: ${request.url}`);
      Dog.create(request.body)
         .then(function(dog_result){
            console.log(dog_result);
            response.redirect('/');
         })
         .catch(function(error){
            response.json(error);
         });
   },
   showEdit: function(request,response){
      Dog.findById(request.params.id)
         .then(function(dog){
            console.log(dog);
            response.render('edit', {dog});
         })
         .catch(function(error){
            response.json(error);
         })
   },
   edit: function(request,response){
      Dog.update({_id : request.params.id }, {$set : {name : request.body.name, owner : request.body.owner, age : request.body.age}, $addToSet : {tricks : request.body.tricks}})
         .then(function(){
            response.redirect('/')
         })
         .catch(function(error){
            response.json(error);
         })
   },
   destroy:function(request,respnse){
      // console.log("destroy dog");
      // response.redirect('/');
      Dog.remove({_id : request.params.id })
         .then(function(){
            response.redirect('/');
         })
         .catch(function(error){
            response.json(error);
         });
   }
}
