// Import required modules
const dotenv = require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const app = express(); // Initialize Express app
const exhbs = require('express-handlebars'); // Import Handlebars templating engine
const dbo = require('./db'); // Import database connection
const BookModel = require('./models/bookModel'); // Import Mongoose model for books

// Establish database connection
dbo.getDatabase();

// ==========================
// Setup Handlebars Template Engine
// ==========================
app.engine('hbs', exhbs.engine({
    layoutsDir: 'views/', // Directory for layout files
    defaultLayout: "main", // Default layout file
    extname: "hbs", // Handlebars file extension
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Allow prototype properties
        allowProtoMethodsByDefault: true // Allow prototype methods
    }
}));
app.set('view engine', 'hbs'); // Set Handlebars as the view engine
app.set('views', 'views'); // Specify the views directory

// ==========================
// Middleware Configuration
// ==========================
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data

// ==========================
// Route: Home (Fetch Books + CRUD Operations)
// ==========================
app.get('/', async (req, res) => {
    try {
        let books = await BookModel.find(); // Fetch all books from the database

        // Extract query parameters
        const { edit_id, delete_id, status } = req.query;
        let message = req.query.message;
        let edit_book = '';

        // Fetch the book details if 'edit_id' is provided (for editing purpose)
        if (edit_id) {
            edit_book = await BookModel.findOne({ _id: edit_id });
        }

        // Delete book operation
        if (delete_id) {
            try {
                const result = await BookModel.deleteOne({ _id: delete_id });
                if (result.deletedCount === 0) {
                    console.log('Error: Delete operation failed.');
                    message = 'Error: Delete operation failed.';
                }
                return res.redirect('/?status=delete'); // Redirect after delete operation
            } catch (error) {
                console.log('Error deleting a book: ' + error);
                message = 'Error deleting a book: ' + error.message;
            }
        }

        // Status Messages for user feedback
        const messages = {
            create: '📖 Book added successfully!',
            update: '✍️ Book updated successfully!',
            delete: '🗑️ Book deleted successfully!',
        };
        display_message = messages[status] || message;

        // Render the main Handlebars template with books list
        res.render('main', {
            display_message,
            books,
            edit_id,
            edit_book
        });

    } catch (error) {
        console.error('Error fetching books:', error);
        res.redirect('/?status=error&message=' + encodeURIComponent(error.message));
    }
});

// ==========================
// Route: Create New Book (POST Request)
// ==========================
app.post('/store_book', async (req, res) => {
    try {
        // Prepare book data from form input
        const bookData = {
            title: req.body.title, 
            author: req.body.author 
        };

        // Create and save the new book document
        await BookModel.create(bookData);

        return res.redirect('/?status=create'); // Redirect after successful creation
    } catch (err) {
        console.log('Error inserting book: ' + err.message);
        return res.redirect('/?status=error&message=' + encodeURIComponent(err.message));
    }
});

// ==========================
// Route: Update Existing Book (POST Request)
// ==========================
app.post('/update_book/:edit_id', async (req, res) => {
    try {
        let editId = req.params.edit_id; // Extract book ID from URL parameters

        let bookData = {
            title: req.body.title, 
            author: req.body.author 
        };

        // Update book details in database
        await BookModel.findOneAndUpdate(
            { _id: editId },
            bookData
        );

        return res.redirect('/?status=update'); // Redirect after successful update
    } catch (err) {
        console.log('Error updating book: ' + err);
        return res.redirect('/?status=error&message=' + encodeURIComponent(err.message));
    }
});

// ==========================
// Start Express Server
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});