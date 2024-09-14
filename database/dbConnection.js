import mongoose from "mongoose";
import "dotenv/config";

export const dbConnection = mongoose
  .connect(process.env.DB_ONLINE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => {
    console.log("The DataBase Connection Was Successfully");
  });
