import mongoose from "mongoose";
import "dotenv/config";



export const dbConnection = mongoose.connect(process.env.DB_ONLINE_CONNECTION).
then(()=>{
    console.log("The DataBase Connection Was Successfully")
})