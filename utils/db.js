import mongoose from "mongoose";
try{
    mongoose.connect('mongodb://localhost:27017/eccomerce');
    console.log("MongoDB is connected successfully!");
}
catch(err){
    console.log("Error occurred while connecting to MongoDB");
}


