
var express = require('express');
var parser = require('body-parser');
var mongoose = require('mongoose');



var app = express();
mongoose.connect('mongodb://localhost/myapp');
// var myModel = mongoose.model('test', new Scheme({}))
mongoose.connection.on('connected',function(){
    console.info('mongodb connected');
});

var Schema = mongoose.Schema;
var animalSchema = new Schema({
    species : String,
    numberOfLegs : Number,
    name : String,
    eatsPeople : Boolean
});

var Animal = mongoose.model('Animal',animalSchema);

var tango = new Animal({
    species : 'dog',
    numberOfLegs : 4,
    name : 'tango',
    eatsPeople: false
});

console.log(tango.name);
// Animal.save(function(){
//     console.log('animal saved!');
// });

// animal.create({
//     species : 'Bird',
//     numberOfLegs : 2,
//     name : 'Benny',
//     eatsPeople : false
// }, function(error, benny){
//     if (error) console.log(error);
//
//     console.log(benny);
// });
