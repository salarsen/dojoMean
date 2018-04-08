var dogs = require('../controllers/dogs.js')
module.exports = function(app){
   app.get('/',function(request,response){
       dogs.show(request,response);
   });

   //create a dog
   app.get('/dogs/new',function(request,response){
      dogs.new(request,response);
   })
   .post('/dogs/add',function(request,response){
      dogs.add(request,response);
   });

   //edit routes
   app.get('/dogs/edit/:id',function(request,response){
      dogs.showEdit(request,response);
   })
   .post('/dogs/:id',function(request,response){
      dogs.edit(request,response);
   })
   .post('/dogs/destroy/:id',function(request,response){
      dogs.edit(request,response);
   })

}
