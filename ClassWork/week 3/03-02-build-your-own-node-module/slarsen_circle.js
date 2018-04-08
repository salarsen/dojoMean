const PI = Math.PI;

// module.exports = {
//     area: function(radius){
//         return (PI * radius * radius);
//     },
//     circumference : function (radius){
//         return (PI * 2 * radius);
//     }
// }

module.exports.area = function(radius){
    return (PI * radius * radius);
};

module.exports.circumference = function(radius){
    return (PI * 2 * radius);
};
