// var value = 0;
// module.exports = {
//     incrementer : function(){
//         value += 2;
//         return value;
//     }
// };

module.exports = function(step){
    var initialValue = 0;

    return function(){
        initialValue += step;
        return initialValue;
    }
}
