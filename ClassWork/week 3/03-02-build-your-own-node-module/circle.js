const PI = Math.PI;

// module.exports = {
//   area: function(radius) {
//     return (PI * Math.pow(radius, 2));
//   },
//   circumference: function(radius) {
//     return (2 * PI * radius);
//   },
// };

module.exports.area = function(radius) {
  return (PI * radius * radius);
};

module.exports.circumference = function(radius) {
  return (2 * PI * radius);
}
