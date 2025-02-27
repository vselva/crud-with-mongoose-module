# Mongoose CRUD Operations

This project demonstrates basic CRUD (Create, Read, Update, Delete) operations using **MongoDB** and **Mongoose** in **Node.js**.

## 📌 Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16.20.2 or later recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or via a cloud service like MongoDB Atlas)
- [Git](https://git-scm.com/) (for cloning the repository)

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/mongoose-crud.git
cd mongoose-crud
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start MongoDB (if running locally)
Make sure MongoDB is running before executing the script.
```sh
mongod --dbpath /path/to/data/db
```

### 4️⃣ Run the Script
```sh
node mongoose.js
```

## 📜 Features & Operations

The script performs the following operations sequentially:

1️⃣ **Database Connection**: Connects to MongoDB using Mongoose.
2️⃣ **Schema & Model Creation**: Defines an Employee schema and creates a model.
3️⃣ **Insert Operations**: Adds single and multiple employees.
4️⃣ **Read Operations**: Retrieves employees based on different criteria.
5️⃣ **Update Operations**: Updates specific fields for one or multiple employees.
6️⃣ **Delete Operations**: Deletes specific or multiple employees.
7️⃣ **Drop Collection**: Deletes all documents by dropping the collection.
8️⃣ **Graceful Shutdown**: Closes the MongoDB connection when operations are complete.

## 🔥 Example Output
```sh
Connecting to Database...
Connected to MongoDB!
----------------------------------------
Inserting One Document...
Inserted one document.
----------------------------------------
Employees:
id: 6123abc... - name: Selva   - age: 24 - Legal status: 
----------------------------------------
Press Enter to continue...
```

## 🛠 Technologies Used
- **Node.js**: JavaScript runtime
- **Mongoose**: ODM (Object-Document Mapping) for MongoDB
- **MongoDB**: NoSQL Database

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).

