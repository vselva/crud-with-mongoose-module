// Import Mongoose (MongoDB ODM)
const mongoose = require('mongoose');

// Define the schema for the "Book" collection
const BookSchema = mongoose.Schema({
    title: String,  // Book title (String type)
    author: String  // Book author (String type)
});

// Create a model for the "Book" collection using the schema
// The first argument ('book') is the collection name (Mongoose will pluralize it to 'books')
const BookModel = mongoose.model('book', BookSchema);

// Export the model to use it in other files
module.exports = BookModel;
