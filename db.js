const mongoose = require('mongoose');

let database;

async function getDatabase() {
    try {
        mongoose.connect('mongodb://localhost:27017/library')
            .then(() => {
                console.log('MongoDB connected with mongoose module')
            })
            .catch(() => {
                console.log('Error in connecting MongoDB with mongoose module')
            });

    } catch (error) {
        console.error('❌ Error connecting to MongoDB: ' + error.message + ' ' + error.name + ' ' + error.stash);
        throw error; // Throw an error so the caller knows the connection failed
    }
}

// Export the function so it can be used in other files
module.exports = { getDatabase };
