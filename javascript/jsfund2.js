var x = 3;
var y = 10;
var a = function (x,y){
    var sum = 0;
    for(var i = x; i <= y; i++){
        sum += i;
    }
    console.log(sum);
}
a(x,y);

var arr = [5,10,0,1,-3];
var c = function(arr){
    var min = 0;
    for(var i = 0; i < arr.length; i++){
        if(arr[i] < min){
            min = arr[i];
        }
    }
    return min;
}

console.log(c(arr));

var b = function(arr){
    var avg = 0;
    for(var i = 0; i < arr.length; i++){
        avg += arr[i];
    }
    return avg/arr.length;
}
console.log(b(arr));

var new_obj = {
    sumFunc: function(x,y){
        var sum = 0;
        for(var i = x; i <= y; i++){
            sum += i;
        }
        console.log(sum);
    },
    minFunc: function(arr){
        var min = 0;
        for(var i = 0; i < arr.length; i++){
            if(arr[i] < min){
                min = arr[i];
            }
        }
        return min;
    },
    avgFunc: function(arr){
        var avg = 0;
        for(var i = 0; i < arr.length; i++){
            avg += arr[i];
        }
        return avg/arr.length;
    }
}
new_obj.sumFunc(x,y);
console.log(new_obj.minFunc(arr));
console.log(new_obj.avgFunc(arr));

var person = {
    name : "Spencer",
    distance_traveled : 0,
    say_name : function(){
        console.log(person.name);
    },
    say_something : function(phrase){
        console.log(person.name,"says",phrase);
    },
    walk : function(){
        console.log(person.name,"is walking.");
        person.distance_traveled += 3;
    },
    run : function(){
        console.log(person.name,"is running.");
        person.distance_traveled += 10;
    },
    crawl : function(){
        console.log(person.name,"is crawling.");
        person.distance_traveled += 1;
    }
}
person.say_name();
person.say_something("I am cool");
person.walk();
person.run();
person.crawl();
console.log(person.distance_traveled);
