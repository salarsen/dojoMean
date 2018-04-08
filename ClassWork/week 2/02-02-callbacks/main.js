var names = ['spencer', 'charlie', 'xona', 'jason'];

var _ = {
   map: function() {
     //code here;
   },
   reduce: function() { 
     // code here;
   },
   find: function(arr,callback) {   
     // code here;
     for(var i = 0; i < arr.length; i++){
         if(callback(arr[i])){
             return arr[i];
         }
     }
   },
   filter: function() { 
     // code here;
   },
   reject: function() { 
     // code here;
   }
 }