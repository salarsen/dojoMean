



// function(){
//     console.log('this is doing important stuff!!!');
// }




function mapArray(arr, doSomething){
    var newArr = [];
    for ( var i = 0; i < arr.length; i ++){
            newArr[i] = doSomething(arr[i]);
    }
    return newArr;
}


console.log(mapArray([1,2,3], function(num){ return num * num })); // [2,4,6]




// function personCreator(name, items){
//   this.name = name;
//   this.items = items;
// }

// personCreator.prototype.stealFrom = function(victim, item){
//   for(var key in victim.items){
//       if(victim.items[key] === item){
//           victim.items.splice(key,1);
//           this.items.push(item);
//           return (true, 'Found!');
//       };
//   };
//   return (false, 'Not found!');
// }

// var charlie = new personCreator('Charlie', ['wallet', 'keys']);
// var jason = new personCreator('Jason', ['chapstick', 'keys', 'phone']);

// console.log(charlie, jason);

// charlie.stealFrom(jason, 'phone');
// // jason.stealFrom(charlie, 'wallet');

// console.log(charlie);
// console.log(jason);