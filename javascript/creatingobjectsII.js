// 'use strict';
function VehicleConstructor(name, numWheels, numPassengers, speed){
    // check if new is in invocation, if not re-invoke with it
    if(!(this instanceof VehicleConstructor)){
        return new VehicleConstructor(name,numWheels,numPassengers,speed);
    }

    this.name = name || "skateboard";
    this.wheels = numWheels || 4;
    this.passengers = numPassengers || 1;
    this.speed = speed || 1;
    this.noise = "Silent but deadly";
    this.distance_travelled = 0;
}

VehicleConstructor.prototype.checkMiles = function(){
    console.log(`${this.name} travelled ${this.distance_travelled} miles`);
    return this;
}

VehicleConstructor.prototype.makeNoise = function(noise){
    this.noise = noise || this.noise;
    console.log(this.noise);
    return this;
}

VehicleConstructor.prototype.move = function(){
    this.updateDistanceTravelled();
    this.makeNoise();
    return this;
}

VehicleConstructor.prototype.updateDistanceTravelled = function(){
    this.distance_travelled += this.speed;
    return this;
}

VehicleConstructor.prototype.generateVinNum = function(){
    var arr = [];
    for(var i = 0; i < 10; i++){
        arr.push(Math.floor(Math.random()*9));
    }
    this.vin = arr.join("");
    return this;
}

VehicleConstructor.prototype.printVin = function(){
    console.log(`${this.name} vin # ${this.vin}`);
    return this;
}

//return this - allows us to chain methods

var bike = VehicleConstructor("bike",2,1,5);
bike.generateVinNum().printVin();
bike.makeNoise().makeNoise("vroom").makeNoise().checkMiles();
bike.move();
bike.checkMiles();
