var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dogSchema = new Schema({
    name : String,
    owner : String,
    age : Number,
    tricks : {
      type: Array,
      default: []
   }
});

var Dog = mongoose.model('Dog',dogSchema);
