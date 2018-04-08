const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8000;
const Schema = mongoose.Schema;

const app = express();

app.use(express.static(path.resolve('static')));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.set('view engine','ejs');
app.set('views',path.resolve('views'));

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/quoting');

mongoose.connection.on('connected',function(){
   console.log('MongoDB connected');
});

const quoteSchema = new Schema({
   creator : String,
   quote : String,
   createdDate : {
      type: Date,
      default: Date.now
   },
   likes : {
      type: Number,
      default: 0
   }
});

const Quote = mongoose.model('Quote',quoteSchema);

app.get('/',function(request,response){
   response.render('index',{creator : '', quote : '', error : undefined}); //set an undefined error box for ejs on index page to not error out
})
.post('/quotes',function(request,response){
   Quote.create(request.body)
      .then(function(new_quote){
         response.redirect('/quotes');
      })
      .catch(function(error){
         response.render('index',{creator : request.body.creator, quote : request.body.quote, error}); //pass defined error and request contents to index
      });
})
.get('/quotes',function(request,response){
   Quote.find({}).sort({likes: -1})
      .then(function(quotes){
         response.render('quotes',{quotes});
      })
      .catch(function(error){
         response.json(error);
      });
})
.get('/likes/:id',function(request,response){
   Quote.update({_id : request.params.id},{$inc : {likes:1}})
      .then(function(){
         response.redirect('/quotes');
      })
      .catch(function(error){
         response.json(error);
      });
});

// the glue...
app.listen(port, function(){
   console.log(`Listening on port ${port}`);
});
