// myNum = 5;
var myNum: number = 5;

// myString = "Hello Universe";
var myString : string = "Hello Universe";

// myArr = [1,2,3,4];
var myArr : number[] = [1,2,3,4];

// myObj = { name:'Bill'};
const myObj = {
    name : 'Bill'
}

// anythingVariable = "Hey";
var anythingVariable : any = "Hey";

// anythingVariable = 25; 
var anythingVariable : any = 25;

// arrayOne = [true, false, true, true]; 
var arrayOne : boolean[] = [true, false, true, true];

// arrayTwo = [1, 'abc', true, 2];
var arrayTwo : any[] = [1, 'abc', true, 2];

// myObj = { x: 5, y: 10 };
const myObj = {
    x : 5,
    y : 10,
};

// object constructor
// MyNode = (function () {
//     function MyNode(val) {
//         this.val = 0;
//         this.val = val;
//     }
//     MyNode.prototype.doSomething = function () {
//         this._priv = 10;
//     };
//     return MyNode;
// }());

class MyNode {
    val : number;

    constructor(valP : number){
        this.val = 0;
        this.val = valP;
    }
    
    doSomething() : void {
        let priv : number = 10;
    }
}
let myNodeInstnace = new MyNode(1);
console.log(myNodeInstnace.val);

// function myFunction() {
//     console.log("Hello World");
//     return;
// }

function myFunction() : void {
    console.log("Hello World");
    return;
}

// function sendingErrors() {
// 	throw new Error('Error message');
// }

function sendingErrors() : never {
    throw new Error('Error message');
}