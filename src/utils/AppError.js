import { Error } from "mongoose";


export class AppError extends Error{
    constructor(message,statusCode){
        this.message = message,
        this.statusCode = statusCode
    }
 }