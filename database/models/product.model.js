import mongoose, { Types } from "mongoose";


const productSchema = new mongoose.Schema({

    title:{
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
    description:{
        type:String,
        required:true,
        minLength:5,
        maxLength:3000
    },
    imageCover:String,
    images:[String],
    price:{
        type:Number,
        required:true,
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        min:0
    },
    sold:Number,
    stock:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:Types.ObjectId,
        required:true,
        ref:'Category'
    },
    subCategory:{
        type:Types.ObjectId,
        required:true,
        ref:'SubCategory'
    },
    brand:{
        type:Types.ObjectId,
        required:true,
        ref:'Brand'
    },
    rateAverage:{
        type:Number,
        min:0,
        max:5
    },
    rateCount:Number,
    createdBy:{
        type:Types.ObjectId,
        // required:true,
        ref:'User'
    }
    
},{
    timestamps:true,
    versionKey:false
})

productSchema.post('init',(doc)=>{
    doc.imageCover = 'http://localhost:3000/uploads/products/'+doc.imageCover
    doc.images = doc.images.map(img=>'http://localhost:3000/uploads/products/'+img)
})

export const Product = mongoose.model('Product' , productSchema)
