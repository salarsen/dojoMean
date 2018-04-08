// function animalCreator(name,species){
//     var animal = {
//         name,
//         species
//     }
//
// }

// lion.introduction = function(){
//     console.log(`Hi, my name is ${this.name} and I am a ${this.species}`);
// // }

// var lion = animalCreator('leon', 'lion');
// lion.introduction();

// var introductionPrototype = {
//     introduction : function(){
//         console.log(`Hi, my name is ${this.name} and I am a ${this.species}`);
//     },
//     changeName : function(newName){
//         this.name = newName;
//     },
//     name : 'bambi',
//     species : 'deer'
// }

// function animalCreator(name,species){
//     var animal = Object.create(introductionPrototype);
//     animal.name = name || animal.name;
//     animal.species = species || animal.species;
//     return animal;
}

// var lion = animalCreator("Bob","lion");
// var lion = animalCreator();
// var tiger = animalCreator("Tigger","Tiger");
// var bear = animalCreator("Smokey","Bear");

// lion.introduction();
// lion.changeName('leon');
// lion.introduction();

function animalCreator(name,species){
    this.name = name || 'bambi';
    this.species = species || 'deer';
}

animalCreator.prototype.introduction = function(){
    console.log(`Hi, my name is ${this.name} and I am a ${this.species}`);
}

animalCreator.prototype.changeName = function(newName){
    this.name = newName;
}

var lion = new animalCreator();
var tiger = new animalCreator("Tigger","Tiger");
var bear = new animalCreator("Smokey","Bear");

lion.introduction();
lion.changeName('leon');
lion.introduction();
tiger.introduction();
