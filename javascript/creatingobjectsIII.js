// 'use strict';
function VehicleConstructor(name, numWheels, numPassengers, speed){
    if(!(this instanceof VehicleConstructor)){
        return new VehicleConstructor(name,numWheels,numPassengers,speed);
    }
    var _this = this;
    var distance_travelled = 0;
    _this.name = name || "skateboard";
    _this.wheels = numWheels || 4;
    _this.passengers = numPassengers || 1;
    _this.speed = speed || 1;
    _this.makeNoise = function(noise){
        var noise = noise || "Silent but deadly";
        console.log(noise);
    };
    _this.checkMiles = function(){
        console.log(`${_this.name} travelled ${distance_travelled} miles`);
    }
    _this.move = function(){
        updateDistanceTravelled();
        _this.makeNoise();
    }
    function updateDistanceTravelled(){
        distance_travelled += _this.speed;
    }
    return _this;
}

var bike = VehicleConstructor("bike",2,1,5);
bike.makeNoise();
bike.makeNoise("vroom");
bike.makeNoise = function(){
    console.log("Ring ring!");
}
bike.move();
bike.move();
bike.move();
console.log(bike);
bike.checkMiles();
bike.makeNoise();


var sedan = new VehicleConstructor("sedan",4,5,10);
sedan.makeNoise = function(){
    console.log("Honk Honk");
}
console.log(sedan);
sedan.makeNoise();


var bus = new VehicleConstructor("bus",4,0,50);
bus.addPassenger = function(){
    bus.passengers ++;
}
bus.move();
bus.move();
console.log(bus);
bus.checkMiles();
console.log("Starting passenger count: ",bus.passengers);
bus.addPassenger();
bus.addPassenger();
console.log("Current passenger count:",bus.passengers);
