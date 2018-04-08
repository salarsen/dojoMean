var _ = {
    map: function(arr,callback) {
        //code here;
        for(var i = 0; i < arr.length; i++){
            arr[i] = callback(arr[i])
        }
        return arr;
    },
    reduce: function(arr,callback) {
        // code here;
        var memo = 0;
        for(var i = 0; i < arr.length; i++){
            //sum =
             memo = callback(memo,arr[i]);
        }
        return memo;
    },
    find: function(arr,callback) {
        // code here;
        for(var i = 0; i < arr.length; i++){
            if(callback(arr[i])){
                return arr[i];
            }
        }
        //return undefined occurs automatically
    },
    filter: function(arr,callback) {
        // code here;
        var ret = [];
            for(var i = 0; i < arr.length; i++){
                if(callback(arr[i])){
                    ret.push(arr[i]);
                }
            }
        return ret;
    },
    reject: function(arr,callback) { //opposite of filter
        var ret = [];
        for(var i = 0; i < arr.length; i++){
            if(!callback(arr[i])){
                ret.push(arr[i]);
            }
        }
        return ret;
    }
}

var multiples = _.map([1,2,3,4,5,6],function(num){
    return num * 3;
});
console.log(multiples);

var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){
    return num % 2 == 0;
});
console.log(evens); // if things are working right, this will return [2,4,6].

var sum = _.reduce([1,2,3,4,5],function(memo, num){
    return memo + num +5;
},100);
console.log(sum);

var pets = [
    { name: 'hank', type:'dog' },
    { name: 'brent', type:'python'},
    { name: 'hebert', type:'lion'}
];

var result = _.find(pets,function(item){
    return item.name === 'brent';
});
console.log(result);

var odds = _.reject([1,2,3,4,5,6],function(num){
    return num % 2 == 0;
});
console.log(odds);
