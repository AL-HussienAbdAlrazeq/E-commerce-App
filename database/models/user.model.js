import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
   name:{
      type:String,
      required:true
    },
    email:{
     type:String,
     required:true 
    },
    password:{
        type:String,
        required:true 
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{
    timestamps:true,
    versionKey:false
})


export const User = mongoose.model('User' , userSchema)