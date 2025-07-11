const mongoose =require('mongoose');

const connectDB = async (URI)=>{
    try{
        await mongoose.connect(URI)
        console.log("Database connected successfully");
    }catch(err){
        console.log("Error connecting to database:", err.message);
    }
}

module.exports = connectDB;