var personPrototype = {
    stealFrom: function(victim,item){
        for(var i = 0; i < victim.ownedItems.length; i++){
            if (victim.ownedItems[i] === item){
                victim.ownedItems.splice(i,1);
                this.ownedItems.push(item); // could do `${victim.name} ${item}` to indicate if someone has someone elses property
                return true;
            }
        }
        return false;
    }
}

function personCreator(name,items){
    var personObj = Object.create(personPrototype);
    personObj.name = name;
    personObj.ownedItems = items;
    return personObj;
}

personCreator.prototype.stealFrom(victim,item){
    
}

var spencer = personCreator('Spencer',['wallet','keys']);
var julia = personCreator('Julia',['chapstick','keys','phone']);

console.log(spencer);
console.log(julia);
