const mongoose = require('mongoose');
const readline = require('readline');

// Create a readline interface to take user input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user input and return a promise
const askQuestion = (query) => {
    return new Promise(resolve => rl.question(query, resolve));
};

// Function to read all documents from the Employee collection
async function readAllCollections (EmployeeModel) {
    return new Promise(async (resolve, reject) => {
        console.log('='.repeat(80));
        console.log('Employees:');
        try {
            // Fetch all employees from the database
            const employees = await EmployeeModel.find();
            employees.forEach((emp) => {
                console.log(`id: ${emp._id} - name: ${emp.name.padEnd(20)} - age: ${emp.age} - Legal status: ${emp.legalStatus}`);
            });
            console.log('='.repeat(80));
            resolve(employees);
        } catch (error) {
            console.log('Error reading employees: ' + error.message);
            reject(error);
        }
    });
}

// Main function to perform CRUD operations
async function crudMongoose() {
    // Step 1: Define Schema
    // This creates a new Mongoose schema object. The schema defines the structure 
    // of documents (records) that will be stored in the "Employee" collection.
    const employeeSchema = new mongoose.Schema({
        name: String, // Defines 'name' field as a string
        age: Number,  // Defines 'age' field as a number
        legalStatus: String // Defines 'legalStatus' field as a string
    });

    // Step 2: Create a Model
    // The model acts as an interface for interacting with the "Employee" collection
    const EmployeeModel = mongoose.model('Employee', employeeSchema);

    console.log('Connecting to Database...');
    try {
        // Step 3: Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/company');
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error('Error in Connecting Database:', error.message);
        process.exit(1);
    }
    
    await askQuestion("Press Enter to continue...");
    
    // Step 4: Insert a single document
    console.log('-'.repeat(40));
    console.log('Inserting One Document...');
    try {
        await EmployeeModel.create({ name: 'Selva', age: 24, legalStatus: '' });
        console.log('Inserted one document.');
    } catch (error) {
        console.error('Error inserting document:', error.message);
    }
    await readAllCollections(EmployeeModel);
    await askQuestion('Press Enter to continue...');
    
    // Step 5: Insert multiple documents
    console.log('-'.repeat(40));
    console.log('Inserting Multiple Documents...');
    try {
        await EmployeeModel.insertMany([
            { name: 'Narumugai', age: 8, legalStatus: '' },
            { name: 'Diana', age: 18, legalStatus: '' }
        ]);
        console.log('Inserted multiple documents.');
    } catch (error) {
        console.error('Error inserting multiple documents:', error.message);
    }
    await readAllCollections(EmployeeModel);
    await askQuestion('Press Enter to continue...');
    
    // Step 6: Read a single document based on a filter
    console.log('-'.repeat(40));
    console.log('Reading a Document...');
    try {
        const employee = await EmployeeModel.findOne({ name: 'Narumugai' });
        console.log('Document found:', employee);
    } catch (error) {
        console.error('Error reading document:', error.message);
    }
    await askQuestion('Press Enter to continue...');
    
    // Step 7: Read multiple documents with a condition (age >= 18)
    console.log('-'.repeat(40));
    console.log('Reading Major Employees (age >= 18)');
    try {
        const majors = await EmployeeModel.find({ age: { $gte: 18 } });
        console.log('Documents found:', majors);
    } catch (error) {
        console.error('Error reading multiple documents:', error.message);
    }
    await askQuestion('Press Enter to continue...');
    
    // Step 8: Update a single document
    console.log('-'.repeat(40));
    console.log('Updating One Document...');
    try {
        await EmployeeModel.updateOne(
            { name: 'Selva' },
            { $set: { name: 'Selvakumar', age: 25 } }
        );
        console.log('Updated one document.');
    } catch (error) {
        console.error('Error updating document:', error.message);
    }
    await readAllCollections(EmployeeModel);
    await askQuestion('Press Enter to continue...');
    
    // Step 9: Update multiple documents based on conditions
    console.log('-'.repeat(40));
    console.log('Updating Multiple Documents...');
    try {
        await EmployeeModel.updateMany(
            { age: { $gte: 18 } },
            { $set: { legalStatus: 'Major' } }
        );
        await EmployeeModel.updateMany(
            { age: { $lt: 18 } },
            { $set: { legalStatus: 'Minor' } }
        );
        console.log('Updated multiple documents.');
    } catch (error) {
        console.error('Error updating multiple documents:', error.message);
    }
    await readAllCollections(EmployeeModel);
    await askQuestion('Press Enter to continue...');
    
    // Step 10: Delete a single document
    console.log('-'.repeat(40));
    console.log('Deleting One Document...');
    try {
        await EmployeeModel.deleteOne({ name: 'Selvakumar' });
        console.log('Deleted one document.');
    } catch (error) {
        console.error('Error deleting document:', error.message);
    }
    await readAllCollections(EmployeeModel);
    await askQuestion('Press Enter to continue...');
    
    // Step 11: Delete multiple documents based on a condition
    console.log('-'.repeat(40));
    console.log('Deleting Multiple Documents...');
    try {
        await EmployeeModel.deleteMany({ age: { $lt: 18 } }); // Delete all employees younger than 18
        console.log('Deleted multiple documents.');
    } catch (error) {
        console.error('Error deleting multiple documents:', error.message);
    }
    await readAllCollections(EmployeeModel);
    await askQuestion('Press Enter to continue...');
    
    // Step 12: Drop the entire collection (removes all documents)
    console.log('-'.repeat(40));
    console.log('Dropping the Collection...');
    try {
        await EmployeeModel.collection.drop();
        console.log('Collection dropped successfully.');
    } catch (error) {
        console.error('Error dropping collection:', error.message);
    }

    // Step 13: Close database connection
    mongoose.connection.close();
    rl.close();
    console.log('Database connection closed.');
}

// Start the CRUD operations
crudMongoose();