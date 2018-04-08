const mongoose = require('mongoose');

//es6 structure, searches for key/property named schema and assigns it
const { Schema } = mongoose;

const ninjaSchema = new Schema({
   name : {
      type : String,
      minLength : 4,
      maxLength : 25,
      trim : true,
      required : true,
   },
   language : {
      type : String,
      trim : true,
      required : true,
   },
   age : {
      type : Number,
      required : true,
   },
   blackBelt : {
      type : Boolean,
      default : false,
   },
}, {
   timestamps : true,
});

module.exports = mongoose.model('ninja',ninjaSchema);
