function VehicleConstructor(name, numWheels, numPassengers){
    return {
        name : name,
        wheels : numWheels,
        passengers : numPassengers,
        makeNoise : null
    }
}

var bike = VehicleConstructor("bike",2,1);
bike.makeNoise = function(){
    console.log("Ring ring!");
}
console.log(bike);
bike.makeNoise();

var sedan = VehicleConstructor("sedan",4,5);
sedan.makeNoise = function(){
    console.log("Honk Honk");
}
console.log(sedan);
sedan.makeNoise();

var bus = VehicleConstructor("bus",4,0);
bus.addPassenger = function(){
    bus.passengers ++;
}
console.log(bus.passengers);
bus.addPassenger();
bus.addPassenger();
console.log(bus.passengers);
