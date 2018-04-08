// module.exports = {
//     add: function(num1, num2) {
//         // add code here
//         return num1 + num2;
//     },
//     multiply: function(num1, num2) {
//         // add code here
//         return num1 * num2;
//     },
//     square: function(num) {
//         // add code here
//         return num * num;
//     },
//     random: function(num1, num2) {
//         // add code here
//         return Math.random(num1,num2);
//     }
// }

module.exports = function(){
    return {
        add: function(num1, num2) {
        console.log(num1,num2);
        // add code here
        return num1 + num2;
        },
        multiply: function(num1, num2) {
            // add code here
            return num1 * num2;
        },
        square: function(num) {
            // add code here
            return num * num;
        },
        random: function(num1, num2) {
            // add code here
            return Math.floor(Math.random(num1,num2 + 1)*num2 + 1);
        }
    }
};
