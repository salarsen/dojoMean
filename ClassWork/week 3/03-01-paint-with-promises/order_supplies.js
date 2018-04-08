function orderSupplies(item) {
  var warehouse; //undefined
  var deliveryTime = Math.random() * 3000;

  return new Promise(function(resolve, reject) {
    setTimeout(function(){
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function() { return 'mix it!' }
        },
        brush: {
          product: 'Horsehair brush',
          directions: function() { return 'start painting!' }
        },
        tarp: {
          product: 'Large Tarp',
          directions: function() { return 'cover the floor!' }
        }
      };

      if (warehouse[item]) {
        resolve(warehouse[item]);
      }
      else {
        reject(`${item} is not available`);
      }
    }, deliveryTime);
  });
}


function displayItem(item) {
  console.log(`I received a ${item.product}. Time to ${item.directions()}`);
}

//
var paint = orderSupplies('paint');
var brush = orderSupplies('brush');
var tarp  = orderSupplies('tarp');

tarp
  .then(displayItem)
  .then(function() {
    return paint.then(displayItem)
  })
  .then(function() {
    return brush.then(displayItem);
  })
  .catch(console.error);


// var brush;
// var paint;
// var tarp;
//
// orderSupplies('brush', function(item) {
//   brush = item;
//   if(paint){
//     displayItem(brush);
//   }
// });
//
// orderSupplies('paint', function(item) {
//   paint = item;
//   displayItem(paint);
//   if(brush){
//     displayItem(brush);
//   }
// });
