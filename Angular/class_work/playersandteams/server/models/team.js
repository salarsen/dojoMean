const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
   name : {
      type : String,
      minLength : 4,
      required : [true,'Must supply a team name'],
      trim : true,
   },
   _players : [{
      type : Schema.Types.ObjectId,
      ref : 'Player'
   }]
},{
   timestamps : true,
});

module.exports = mongoose.model('Team',TeamSchema);
