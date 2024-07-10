import mongoose, { Types } from "mongoose";


const subCategorySchema = new mongoose.Schema({

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
    category:{
        type: Types.ObjectId ,
        ref:'Category',
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})


export const SubCategory = mongoose.model('SubCategory' , subCategorySchema)