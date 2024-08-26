import mongoose, { Types } from "mongoose";


const orderSchema = new mongoose.Schema({
    user:{type:Types.ObjectId , ref:'User'},
    orderItems:[
        {
            product:{type:Types.ObjectId , ref:'Product'},
            quantity:Number,
            price:Number
        }
    ],
    totalOrderPrice:Number,
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    shippingAddress:{
        street:String,
        city:String,
        phone:String
    },
    paymentType:{
        type:String , 
        enum:['cash' , 'credit'],
        default:'cash'
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt :Date
},{
    timestamps:true,
    versionKey:false
})


export const Order = mongoose.model('Order' , orderSchema )