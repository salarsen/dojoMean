const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const port = process.env.PORT || 8000;

const app = express();

mongoose.connect('mongodb://localhost/1955api');

mongoose.connection.on("connected",function(){
    console.log("MongoDB connected");
});

const userSchema = new Schema({
    name : {
        type: String,
        required: true,
        minLength : 4
    }
});

const User = mongoose.model('User',userSchema);

app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

// app.set('views',path.resolve('views'))
app.get('/',function(request,response){
    User.find({})
        .then(function(users){
            response.json(users);
        })
        .catch(function(error){
            response.json(error);
        });
})
.get('/new/:name',function(request,response){
    User.create({name : request.params.name })
        .then(function(new_user){
            console.log(new_user);
            response.redirect('/');
        })
        .catch(function(error){
            response.json(error);
        });
})
.get('/delete/:name',function(request,response){
    User.remove({name : request.params.name})
        .then(function(){
            response.redirect('/');
        })
        .catch(function(error){
            response.json(error);
        });
})
.get('/:name',function(request,response){
    User.find({name : request.params.name})
        .then(function(user_info){
            response.json(user_info);
        })
        .catch(function(error){
            response.json(error);
        });
});

app.listen(port,function(){
    console.log(`Listening on port ${port}`);
});
