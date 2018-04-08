const Book = require('mongoose').model('Book');

module.exports = { 
    index(request, response){
        Book.find({})
            .then(books => response.json(books))
            .catch(console.log);
    },
    show(request, response){
        console.log(request.params);
        Book.findById(request.params.book_id)
            .then(book => response.json(book))
            .catch(console.log);
    },
    create(request, response){
        Book.create(request.body)
            .then(book => response.json(book))
            .catch(console.log);
    },
    update(request, response){

    },
    destroy(request, response){

    }
}