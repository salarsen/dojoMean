//
// var count = 0;
//
// function outerScope(){
//     return function innerScope(){
//         count ++;
//         console.log(count);
//         return count;
//     }
// }
//
// var counter = outerScope();
//
// counter();
// counter();
// counter();

var c_obj = {
    count : 0,
    counter: function(){
        c_obj.count++;
        console.log(c_obj.count);
    }

}
c_obj.counter();
c_obj.counter();
c_obj.counter();

function greenScope(){
    var count = 0;
    return function(){
        count++;
        return count;
    }
}

var counter = greenScope();
console.log(counter());
console.log(counter());
console.log(counter());
