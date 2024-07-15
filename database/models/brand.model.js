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
    logo:{
        type:String,
        required:true
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User'
    }
},{
    timestamps:true,
    versionKey:false
})

brandSchema.post('init' , (doc)=>{
    doc.logo = 'http://localhost:3000/uploads/brands/' + doc.logo
})


export const Brand = mongoose.model('Brand' , brandSchema)