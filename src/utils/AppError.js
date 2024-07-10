import { Error } from "mongoose";


export class AppError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
 }