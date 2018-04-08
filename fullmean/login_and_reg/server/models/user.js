const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
   email : {
      type : String,
      required : [true, "Email cannot be blank."],
      unique : [true, "This email is already registered, try logging in?"],
      trim : true,
      minlength : 7,
      validate : [{
         validator : function ( email ){
            return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test( email );
         },
         message : "Email is not formatted correctly. Format like email@email.com"
      }]
   },
   // username : {
   //    type : String,
   //    required : [true, "Username cannot be blank."],
   //    trim : true,
   //    // unique : [true, "Username already exists."],
   //    minlength : 2,
   //    maxlength : 20,
   //    valdiate : [{
   //       validator : function (username){
   //          return /^[a-zA-Z0-9_]+$/.test(username);
   //       },
   //       message : 'Username can only contains letters, numbers, and underscores.'
   //    }],
   // },
   password : {
      type : String,
      required : [true, "Password field cannot be blank."],
      trim : true,
      minlength : 8,
      maxlength : 128,
   },
   name : {
      first : {
         type : String,
         required : [true, "You need a first name."],
         trim : true,
      },
      last : {
         type : String,
         required : [true, "You need a last name."],
         trim : true,
      }
   },
   // birthday : {
   //    type : Date,
   //    required : [true, "Birthday needed to verify age requirements"],
   // },
},{
   timestamps : true,
});

userSchema.post('save',function(error, doc, next){
   if(error.name === 'MongoError' && error.code === 11000){
      // console.log('duplicate key error');
      next({
         success : false,
         errors : {
            duplicateKey : {
               message : 'Username already exists.',
            },
         },
      });
   } else {
      next(error);
   }
});

userSchema.pre('save',function(next){
   if(!this.isModified('password')) return next();

   bcrypt.hash(this.password, 10)
      .then(hash => {
         this.password = hash;
         next();
      })
      .catch(next);
});

userSchema.methods.passwordMatch = function(password){
   return this.password === password;
};

userSchema.statics.verifyPassword = function(inputPassword, hashPassword){
   return bcrypt.compare(inputPassword, hashPassword);
};

module.exports = mongoose.model('User',userSchema);
