function fib() {
    // Some variables here
    var fibArr = [0];
    var fibLength = fibArr.length; // do this so we are not calling the .length function repeatedly
    function nacci() {
        // do something to those variables here
        if(fibLength === 1){
            fibArr.push(fibArr[0] + 1);
            fibLength++;
        } else {
            fibArr.push(fibArr[fibLength - 1] + fibArr[fibLength - 2]);
            fibLength++;
        }
        console.log(fibArr[fibLength - 1]);
    }
    return nacci
}

var fibCounter = fib();
fibCounter(); // should console.log "1"
fibCounter(); // should console.log "1"
fibCounter(); // should console.log "2"
fibCounter(); // should console.log "3"
fibCounter(); // should console.log "5"
fibCounter(); // should console.log "8"
fibCounter();
fibCounter();
