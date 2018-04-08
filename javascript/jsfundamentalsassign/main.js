var x = [3,5,"Dojo", "rocks", "Michael", "Sensei"];
for(var val in x){
    console.log(x[val]);
};
x.push(100);
console.log(x);
var a = ["hello", "world", "JavaScript is Fun"];
x.push(a);
console.log(x);
var sum = 0;
for(var i = 0; i <= 500; i++){
    sum += i;
}
console.log(sum);
var b = [1, 5, 90, 25, -3, 0];
var min = 0;
var avg = 0;
for(var i = 0; i < b.length; i++){
    if(b[i] < min){
        min = b[i];
    }
    avg += b[i];
}
avg = avg/b.length;
console.log(min);
console.log(avg);
var new_ninja = {
 name: 'Jessica',
 profession: 'coder',
 favorite_language: 'JavaScript', //like that's even a question!
 dojo: 'Dallas'
}
for(var key in new_ninja){
    console.log(key,new_ninja[key]);
}
