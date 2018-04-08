module.exports = function(step) {
    var initialValue = 0;

    return function() {
      initialValue += step;
      return initialValue;
    }
};
