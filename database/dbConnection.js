import mongoose from "mongoose";


export const dbConnection = mongoose.connect('mongodb://localhost:27017/E-commerce_App').
then(()=>{
    console.log("The DataBase Connection Was Successful")
})