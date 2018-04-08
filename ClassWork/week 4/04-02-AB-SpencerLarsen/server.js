const express = require('express');
const path = require('path');
const parser = require('body-parser');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const port = process.env.PORT || 8000;

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authors_books_db');

mongoose.connection.on('connected',function(){
   console.log("Connected to MongoDB");
});

app.use(express.static(path.resolve('client')));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.set('view engine','ejs');
app.set('views',path.resolve('views'));

//catch if new is not used
// function Schema(){
//   if(!(this instanceof Author)){
//     return new Schema;
//   }
// }

const AuthorSchema = new Schema({
  name: String,
  age: Number,
  isAlive: Boolean,
  /*
   {
      type: Boolean,
      default: true
   }
  */
  books: [{
     type: Schema.Types.ObjectId,
     ref: 'Book'
 }]
});

const BookSchema = new Schema({
  title: String,
  publishDate: Date,
  pageCount: Number,
  subject: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author'
  }
});

//module.exports =
const Author = mongoose.model('Author',AuthorSchema);
const Book = mongoose.model('Book',BookSchema);

app.get('/',function(request,response){
   response.render('index');
});

app.get('/authors',function(request,response){
   Author.find({})
      .populate('books')
      .exec()
      .then(function(authors){
         console.log(authors);
         response.render('authors/index',{ authors });
      })
      .catch(function(error){
         response.json(error);
      })
})
.get('/authors/:id', function(request,response){
   console.log(request.params);
   Author.findById(request.params.id)
   .populate('books')
   .exec()
      .then(function(author){
         response.render('authors/show', {author});
      })
      .catch(function(error){
         response.json(error);
      });
})
.get('/authors/new',function(request,response){
   response.render('authors/new');
})
.post('/authors/create',function(request,response){
   console.log(request.body);

   request.body.isAlive = !!request.body.isAlive; //undefined right ! turns into boolean and true, if defined, left keeps it as is

   Author.create(request.body)
      .then(function(user){
         console.log(user);
         response.redirect('/authors');
      })
      .catch(function(error){
         console.log(error);
         response.json(error);
      });
});


app.get('/books',function(request,response){
   Book.find({})
      .populate('author')
      .then(function(books){
         response.render('books/index', {books} );
      })
      .catch(function(error){
         response.json(error);
      });
})
.get('/books/:id', function(request,response){
   Book.findById(request.params.id)
   .populate('author')
   .exec()
      .then(function(book){
         response.render('books/show', {book});
      })
      .catch(function(error){
         response.json(error);
      });
})
.get('/books/new',function(request,response){
   Author.find({})
      .then(function(authors){
         response.render('books/new', { authors });
      })
      .catch(function(error){
         response.json(error);
      });
})
.post('/books/create',function(request,response){
   // console.log(request.body);
   Book.create(request.body)
      .then(function(user){
         return Author.update({_id : user.author},{$addToSet: {books : user.id}})
            .then(function(auth_update){
               console.log(auth_update);
               response.redirect('/');
            })
      })
      .catch(function(error){
         console.log(error); 
         response.json(error);
      });
})
/*
  Author:
    Name: String
    Age: Number
    isAlive: Boolean
    books: Book[]

1 to many - author => many books, book => 1 author

  Book:
    Title: String
    PublishedDate: date
    pageCount: Number
    subject: String
    author: Author
*/

function handleError(response,error){
   // log the error
   response.status(500).json(error);
}


app.listen(port,function(){
  console.log(`Server listening on port: ${port}`);
});
