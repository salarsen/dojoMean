const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlayerSchema = new Schema({
   name : {
      type : String,
      minLength: 4,
      required: [true,'Must provide some information'],
      trim : true,
   },
   _team : {
      type : Schema.Types.ObjectId,
      ref : 'Team',
   }
}, {
   timestamps : true,
});

module.exports = mongoose.model('Player',PlayerSchema);
