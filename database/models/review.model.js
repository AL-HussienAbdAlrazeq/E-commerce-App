import mongoose, { Types } from "mongoose";


const reviewSchema = new mongoose.Schema({

    comment:{
        type:String,
        minLength:[10, "Too Short comment Name"]
    },
    product:{
        type:Types.ObjectId,
        ref:'Product',
        required:true
    },
    user:{
        type:Types.ObjectId,
        ref:'User',
        require:true
    },
    rate:{
        type:Number,
        min:0,
        max:5
    },

},{
    timestamps:true,
    versionKey:false
})


export const Review = mongoose.model('Review' ,reviewSchema )