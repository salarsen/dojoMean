//global.Promise

/*
    node provides = require, global, process

    var circle = require
    circle.area => some area
    circle.circumference => some circumference
*/

// var circle = require('./slarsen_circle');
//
// // console.log(circle);
// console.log(circle.area(2));
// console.log(circle.circumference(8));

var incrementer = require('./slarsen_incrementer')(3);
// incrementer = incrementer.incrementer;
console.log(incrementer());
console.log(incrementer());
console.log(incrementer());
var incrementer2 = require('./slarsen_incrementer')(2);
console.log(incrementer2());
console.log(incrementer2());
