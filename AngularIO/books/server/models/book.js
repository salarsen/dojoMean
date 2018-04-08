const mongoose = require('mongoose');
const { Schema } = mongoose;
/** 
 
    title : string;
    year : number;
    pages : number;
    author : string;
    publisher : string;
*/
const bookSchema = new Schema({
    title : {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required : true,
        trim: true,
        default: 'Unknown',
    },
    year: Number,
    pages: Number,
    publisher: String,
},
{
    timestamps: true,
});

module.exports = mongoose.model('Book', bookSchema);
