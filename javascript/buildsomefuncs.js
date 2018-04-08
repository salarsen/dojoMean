// Basic: Make a function that can be used anywhere in your file and that when invoked will console.log('I am running!'); Give it the name runningLogger.

function runningLogger(){
    console.log('I am running!');
}
runningLogger();

//  Basic: Make a function that is callable, has one parameter and multiplies the value of the parameter by 10 before returning the result. Give it the name multiplyByTen. Invoke it, passing it the argument 5.

function multiplyByTen(value){
    return value*10;
}
console.log(multiplyByTen(5));

//  Basic: Write two functions (stringReturnOne and stringReturnTwo) that each return a different hard-coded string

function stringReturnOne(){
    return "Hahahahaha";
}

function stringReturnTwo(){
    return "What's so funny?";
}
console.log(stringReturnOne(),stringReturnTwo());

//  Medium: Write a function named caller that has one parameter. If the argument provided to caller is a function (typeof may be useful), invoke the argument. Nothing is returned.

function caller(arg){
    if(typeof(arg) == "function"){
        console.log("calling function");
        console.log(arg());
    }
}

caller(stringReturnOne);
//  Medium: Write a function named myDoubleConsoleLog that has two parameters, if the arguments passed to the function are functions, console.log the value that each, when invoked, returns.

function myDoubleConsoleLog(arg1,arg2){
    if(typeof(arg1) == "function" && typeof(arg2) == "function"){
        console.log(arg1(),arg2());
    }
}
myDoubleConsoleLog(stringReturnOne,stringReturnTwo);

//  Hard: Write a function named caller2 that has one parameter. Have it console.log the string 'starting', wait 2 seconds, and then invokes the argument if the argument is a function. (setTimeout may be useful for this one.) The function should then console.log ‘ending?’ and return “interesting”. Invoke this function by passing it myDoubleConsoleLog.
function caller2(arg1){
    console.log("starting");
    if(typeof(arg1) == "function"){
        setTimeout(2);
        arg1();
    }
    console.log("ending?");
    return "interesting";
}

console.log(caller2(myDoubleConsoleLog()));
console.log(caller2(myDoubleConsoleLog(stringReturnOne,stringReturnTwo)));
