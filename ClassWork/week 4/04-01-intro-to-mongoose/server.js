var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');

var app = express();


app.use(parser.json());
mongoose.connect('mongodb://localhost/animals');

mongoose.connection.on('connected', function() {
  console.info('mongodb connected');
});

var Schema = mongoose.Schema;
var animalSchema = new Schema({
  species: String,
  numberOfLegs: Number,
  name: String,
  eatsPeople: Boolean
});

var Animal = mongoose.model('Animal', animalSchema);

// var animal = new Animal({
//   species: 'Lion',
//   numberOfLegs: 4,
//   name: 'Leo',
//   eatsPeople: true
// });

// animal.save(function() {
//   console.log('animal saved???');
// });

//
// Animal.create({
//   species: 'Bird',
//   numberOfLegs: 2,
//   name: 'Benny',
//   eatsPeople: false
// })
// .then(function(benny) {
//   console.log(benny);
// })
// .catch(console.log);

mongoose.Promise = global.Promise;

app.get('/', function(request, response) {
  // Animal.find({})
  //   .then(function(animals) {
  //     response.json(animals);
  //   })
  //   .catch(function(error) {
  //     console.error(error);
  //   })
  response.render('index');
});

app.listen(8008, function(){
  console.log('server running on port 8008');
});
