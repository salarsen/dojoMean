function personCreator(name,items){
    return {
        name,
        ownedItems : items,
        stealSomething : function(victim,item){
            for(var i = 0; i < victim.ownedItems.length; i++){
                if (victim.ownedItems[i] === item){
                    victim.ownedItems.splice(i,1);
                    this.ownedItems.push(item); // could do `${victim.name} ${item}`
                    return true;
                }
            }
            return false;
        }
    }
}

var spencer = personCreator('Spencer',['wallet','keys']);
var julia = personCreator('Julia',['chapstick','keys','phone']);

console.log(julia);
console.log(spencer);
console.log(julia.stealSomething(spencer,'keys'));
console.log(julia);
console.log(spencer);
console.log(spencer.stealSomething(julia,'phone'));
console.log(julia);
console.log(spencer);

// function myfunction(){
//     console.log(this);
// }
// myfunction();
