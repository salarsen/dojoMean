/*
  require, global, process

  var circle = require('./circle');
  circle.area(2)
  => some area
  circle.circumference(2)
  => some circumference
*/


var circle = require('./circle');

console.log(circle.area(2));
console.log(circle.circumference(2));

var incrementer = require('./incrementer')(9);
var incrementer2 = require('./incrementer')(3);

console.log(incrementer());
console.log(incrementer());

console.log('inc2', incrementer2());

console.log(incrementer());
/*
incrementer()
=> 2
incrementer()
=> 4
incrementer()
=> 6
*/
