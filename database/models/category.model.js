import mongoose, { Types } from "mongoose";


const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        unique:[true , "Name is required"],
        trim:true,
        required:true,
        minLength:[2, "Too Short Category Name"]
    },
    slug:{
        type:String,
        unique:[true , "Name is required"],
        lowercase:true,
        required:true
    },
    image:String,
    createdBy:{
        type:Types.ObjectId,  
        ref:'User'
    }
},{
    timestamps:true,
    versionKey:false
})


export const Category = mongoose.model('Category' , categorySchema)