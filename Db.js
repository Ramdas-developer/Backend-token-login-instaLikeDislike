const mongoose = require('mongoose')

const connectDB = () =>{
    mongoose.connect("mongodb://localhost:27017/userData")
.then(()=>console.log("Database connected successfully."))
.catch((error)=>console.log("Database connection error", error))
};

module.exports = connectDB;