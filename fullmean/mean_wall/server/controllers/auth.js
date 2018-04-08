const User = require('mongoose').model('User');

module.exports = {
   login(request,response){
      User.findOne({ username : request.body.username })
         .then(function(user){

            if(!user) return response.json({success : false, errorMessage : 'No Such Credentials'});

            if(!request.body.password) return response.json({success : false, errorMessage : 'Password is required'});

            return User.verifyPassword(request.body.password, user.password)
               .then(function(result){

                  // since bcrypt promise does not prevent us from entering this promise, verify we got a valid password match, otherwise exit immeditately
                  if(!result) return response.json({ success : false, errorMessage : 'Password incorrect' });

                  attachSession(request, response, user);
                  response.json({ success : true, user });
               });
         })
         .catch(handleError.bind(response));
   },

   register(request, response){
      // if(request.body.passwordConf === '' || request.body.passwordConf === undefined) return response.json({ success : false, errorMessage : 'Password confirmation cannot be blank.'});

      if(request.body.user === undefined) return response.json({ success : false, errorMessage : 'You cannot register with empty fields.' });

      if (request.body.user.password !== request.body.passwordConf) return response.json({ success : false, errorMessage : 'Passwords do not match!'});

      User.create(request.body.user)
         .then(function(user){
            attachSession(request, response, user);
            response.json({ success : true, user });
         })
         .catch(handleError.bind(response));
   },

   logout(request,response){
      console.log('destroy user');
      request.session.destroy();
      response.clearCookie('userID');
      response.clearCookie('expiration');
      response.json({ success : true });
   },

   getUser(request,response){
      User.findOne({_id : request.cookies.userID })
         .then(function(user){
            response.json({ success : true, user : {_id : user._id, name : user.name}});
         })
         .catch(handleError.bind(response));
   },
};

function attachSession(request, response, user){
   // console.log('Attaching:',user);
   request.session.user = user;
   response.cookie('userID', user._id.toString());
   response.cookie('expiration', Date.now() + 86400 * 1000);
}

function handleError(error){
   // console.log(error);
   if(error.name === 'ValidationError'){
      this.json({success: false, error : error.errors})
   } else {
      this.status(500).json({ success : false, errorMessage : error.message });
   }
}
