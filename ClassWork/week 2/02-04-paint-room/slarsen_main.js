// function orderSupplies(item, callback) {
//     var warehouse; // undefined
//     var deliveryTime = Math.random() * 3000;
//     setTimeout(function () {
//         warehouse = {
//             paint: {
//                 product: "Neon Green Paint",
//                 directions: function () {
//                     console.log(deliveryTime/1000,'s');
//                     return "mix it!";
//                 }
//             },
//             brush: {
//                 product: "Horsehair brush",
//                 directions: function () {
//                     console.log(deliveryTime/1000,'s');
//                     return "start painting!";
//                 }
//             }
//         };
//         callback(warehouse[item]);
//     }, deliveryTime);
// }
//
//
// function printDelivery(item){
//     var output = `${item.product} received, time to ${item.directions()}`;
//     console.log(output);
//     return true;
// }

// var paintTest; // undefined until we have a result from the paint delivery
//
// orderSupplies('paint', function(item){
//     paintTest = printDelivery(item); // set parent variable to true
// });
//
// orderSupplies('brush', function(item){
//     var testInt = setInterval(function(){
//         if(paintTest){ // will loop until we have a true for paintTest.
//             clearInterval(testInt); // do not remove unless you want to infinite loop...
//             printDelivery(item); //print now that we know we have the paint supplies...
//             // console.log("clearing interval");
//         }
//     },0)
// });

// var paint;
// var brush;
// orderSupplies('brush',function(item){
//     brush = item;
//     if(paint){
//         printDelivery(brush);
//     }
// });
//
// orderSupplies('paint',function(item){
//     paint = item;
//     printDelivery(paint);
//     if(brush){
//         printDelivery(brush);
//     }
// });

function orderSupplies(item) {
    var warehouse; // undefined
    var deliveryTime = Math.random() * 3000;
    return new Promise(function(resolve,reject){
        setTimeout(function () {
            warehouse = {
                paint: {
                    product: "Neon Green Paint",
                    directions: function () {
                        console.log(deliveryTime/1000);
                        return "mix it!";
                    }
                },
                brush: {
                    product: "Horsehair brush",
                    directions: function () {
                        console.log(deliveryTime/1000);
                        return "start painting!";
                    }
                }
            };
            if(warehouse[item]){
                resolve(warehouse[item]);
            } else {
                reject(`${item} is not available`);
            }
        }, deliveryTime);
    });
}

function printDelivery(item){
    console.log(`${item.product} received, time to ${item.directions()}`);
}

var paint = orderSupplies('paint');
var brush = orderSupplies('brush');
var tarp = orderSupplies('tarp');

// paint.then(printDelivery);
// brush.then(printDelivery);

paint.then(function(item){
    printDelivery(item);
    return brush.then(function(item){
        printDelivery(item);
    });
})
.catch(function(error){
    console.log(error)
});


tarp.catch(function(error){
    console.log(error)
})
