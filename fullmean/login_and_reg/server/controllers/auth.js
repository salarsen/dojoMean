const User = require('mongoose').model('User');

module.exports = {
   login(request,response){
      console.log('Auth Server Controller - Login User');
      User.findOne({ email : request.body.email })
         .then(function(user){
            // console.log('Searched for user',user);
            if(!user) return response.json({
               success : false,
               errors : {
                  password : {
                     message : 'No Such Credentials.',
                  },
               },
            });
            // console.log('pass',request.body.password);
            if(!request.body.password) return response.json({
               success : false,
               errors : {
                  password : {
                     message : 'Passwords is required.',
                  },
               },
            });

            // console.log('verifying entered password matches what user put in');
            return User.verifyPassword(request.body.password, user.password)
               .then(function(result){

                  // since bcrypt promise does not prevent us from entering this promise, verify we got a valid password match, otherwise exit immeditately
                  if(!result) return response.json({
                     success : false,
                     errors : {
                        password : {
                           message : 'Passwords incorrect!',
                        },
                     },
                  });

                  attachSession(request, response, user);
                  response.json({ success : true, user });
               });
         })
         .catch(handleError.bind(response));
   },

   register(request, response){
      // if(request.body.passwordConf === '' || request.body.passwordConf === undefined) return response.json({ success : false, errorMessage : 'Password confirmation cannot be blank.'});

      console.log('Auth Server Controller - Register User');

      // check if fields are populated
      if (request.body.user === undefined){
         return response.json({
            success : false,
            errors : {
               register : {
                  message : 'User fields are empty.',
               },
            },
         });
      }

      // check if passwords match before proceeding
      if (request.body.user.password !== request.body.passwordConf) return response.json({
         success : false,
         errors : {
            password : {
               message : 'Passwords do not match!',
            },
         },
      });

      console.log('trying to register');

      User.create(request.body.user)
         .then(function(user){
            console.log('Registered:',user);
            attachSession(request, response, user);
            response.json({ success : true, user });
         })
         .catch(handleError.bind(response));
   },

   getUser(request,response){
      console.log('Fetching',request.params.id);
      User.findOne({ _id : request.params.id })
         .then(function(user){
            //should modify user here so we are not sending back hashed password data
            response.json({
               success : true,
               user
            });
         })
         .catch(handleError.bind(response));
   },

   logout(request,response){
      console.log('Logging user out');
      request.session.destroy();
      response.clearCookie('userID');
      response.clearCookie('expiration');
      response.json({ success : true });
   },
};

function attachSession(request, response, user){
   request.session.user = user;
   response.cookie('userID', user._id.toString());
   response.cookie('expiration', Date.now() + 86400 * 1000);
}

function handleError(error){
   console.log('error:',error);
   this.json({success : false, errors : error.errors}); //format this way to match our other error formatting and allow one method of looping
}
