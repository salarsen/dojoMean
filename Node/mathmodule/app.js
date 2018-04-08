// var my_module = require('./mathlib');
// console.log(my_module.add(2,3));
// console.log(my_module.multiple(3,4));
// console.log(my_module.square(4));
// console.log(my_module.random(3,9));

var my_module = require('./mathlib')();
console.log(my_module.add(2,3));
console.log(my_module.multiply(2,4));
console.log(my_module.square(3));
console.log(my_module.random(2,10));
