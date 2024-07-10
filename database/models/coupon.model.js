import mongoose, { Types } from "mongoose";


const couponSchema = new mongoose.Schema({

    code:{
        type:String,
        unique:true,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    expires:{
        type:Date,
        required:true
    }

},{
    timestamps:true,
    versionKey:false
})


export const Coupon = mongoose.model('Coupon' , couponSchema)