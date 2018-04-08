var personPrototype = {
    stealFrom: function (victim, item){
        for(var i = 0; i < victim.ownedItems.length; i++){
            if(victim.ownedItems[i] === item){
                this.ownedItems.push(item);
                victim.ownedItems.splice(i,1);
                return true;
            };
        };
        return false;
    }
}

function personCreator(name, items) {
    var personObj = Object.create(personPrototype);
    personObj.name = name;
    personObj.ownedItems = items;
    return personObj;
}



var charlie = personCreator('Charlie', ['wallet', 'keys']);
var jason = personCreator('Jason', ['chapstick', 'keys', 'phone']);


// // Get this to work!

charlie.stealFrom(jason, 'phone');

console.log(charlie);
console.log(jason);
