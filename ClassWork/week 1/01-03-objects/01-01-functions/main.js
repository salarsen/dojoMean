
var count = 0;

function outerScope(){
    return function innerScope(){
        count ++
        console.log(count);
        return count;
    }
}

var counter = outerScope();

counter();
counter();
counter();