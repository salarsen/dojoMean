require('dotenv').load();
const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.port || 8000;

const app = express();

/* ---------------- Setup Here --------------- */
app.use(express.static(path.resolve('static')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


app.set('views', path.resolve('views'));
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost/introtomongo');

mongoose.connection.on('connected', function(){
    console.log('mongodb connect');
});

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const dogSchema = new Schema({
    name : String,
    owner : String,
    age : Number,
    tricks : {
      type: Array,
      default: []
   }
});

const Dog = mongoose.model('Dog',dogSchema);

/* ------------- Route's Here ------------------ */

app.get('/',function(request,response){
    console.log(`Route: ${request.url}`);
    Dog.find({})
        .then(function(dogs){
           console.log(dogs);
           response.render('index',{dogs});
        })
        .catch(function(error){
           response.json(error)
        });
});

//create a dog
app.get('/dogs/new',function(request,response){
    console.log(`Route: ${request.url}`);
    response.render('new');
})
.post('/dogs/add',function(request,response){
   console.log(`Route: ${request.url}`);
   Dog.create(request.body)
      .then(function(dog_result){
         console.log(dog_result);
         response.redirect('/');
      })
      .catch(function(error){
         response.json(error);
      });
});

//edit routes
app.get('/dogs/edit/:id',function(request,response){
   Dog.findById(request.params.id)
      .then(function(dog){
         console.log(dog);
         response.render('edit', {dog});
      })
      .catch(function(error){
         response.json(error);
      })
})
.post('/dogs/:id',function(request,response){
   Dog.update({_id : request.params.id }, {$set : {name : request.body.name, owner : request.body.owner, age : request.body.age}, $addToSet : {tricks : request.body.tricks}})
      .then(function(){
         response.redirect('/')
      })
      .catch(function(error){
         response.json(error);
      })
})
.post('/dogs/destroy/:id',function(request,response){
   // console.log("destroy dog");
   // response.redirect('/');
   Dog.remove({_id : request.params.id })
      .then(function(){
         response.redirect('/');
      })
      .catch(function(error){
         response.json(error);
      });
})

/* ------------- App Listen Here --------------- */
app.listen(port,function(){
    console.log(`Listening on port ${port}`)
})
