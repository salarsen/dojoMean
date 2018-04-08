function orderSupplies(item, callback) {
    var warehouse; // undefined
    var deliveryTime = Math.random() * 3000;
    setTimeout(function () {
        warehouse = {
            paint: {
                product: "Neon Green Paint",
                directions: function () {
                    console.log(deliveryTime/1000,'s');
                    return "mix it!";
                }
            },
            brush: {
                product: "Horsehair brush",
                directions: function () {
                    console.log(deliveryTime/1000,'s');
                    return "start painting!";
                }
            }
        };
        callback(warehouse[item]);
    }, deliveryTime);
}


function printDelivery(item){
    var output = `${item.product} received, time to ${item.directions()}`;
    console.log(output);
    return true;
}

var paintTest; // undefined until we have a result from the paint delivery

orderSupplies('paint', function(item){
    paintTest = printDelivery(item); // set parent variable to true
});

orderSupplies('brush', function(item){
    var testInt = setInterval(function(){
        if(paintTest){ // will loop until we have a true for paintTest.
            clearInterval(testInt); // do not remove unless you want to infinite loop...
            printDelivery(item); //print now that we know we have the paint supplies...
            // console.log("clearing interval");
        }
    },0)
});



// orderSupplies('paint',function(item){
//     printDelivery(item);
//     orderSupplies('brush',function(item){
//         printDelivery(item);
//     });
// })


/*
Neon Green Paint received, time to mix it!
Horsehair brush received, time to start painting!
*/

// orderSupplies(function(item){
//
// })
