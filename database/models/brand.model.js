import mongoose, { Types } from "mongoose";


const brandSchema = new mongoose.Schema({

    name:{
        type:String,
        unique:[true , "Name is required"],
        trim:true,
        required:true,
        minLength:[2, "Too Short Category Name"]
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    logo:String,
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})


export const Brand = mongoose.model('Brand' , brandSchema)