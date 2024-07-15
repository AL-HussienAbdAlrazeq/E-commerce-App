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

categorySchema.post('init' , (doc)=>{
    doc.image = 'http://localhost:3000/uploads/categories/'+doc.image
})


export const Category = mongoose.model('Category' , categorySchema)