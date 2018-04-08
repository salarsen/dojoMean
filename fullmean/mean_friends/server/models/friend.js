const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const friendSchema = new Schema({
   name : {
      type : String,
      minLength : 4,
      required : [true, 'Must provide some information'],
      trim : true,
   },
   age : {
      type : Number,
      min: [1, 'You have to be at least 1!'],
      required : true,
   },
   sex : {
      type : String,
      required : true,
   },
   birthday : {
      type : Date,
      required : true,
   },
},{
   timestamps : true,
});

module.exports = mongoose.model('Friend',friendSchema);
