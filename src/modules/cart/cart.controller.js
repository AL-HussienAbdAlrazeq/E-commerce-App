
import { Cart } from "../../../database/models/cart.model.js"
import { Coupon } from "../../../database/models/coupon.model.js"
import { Product } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"

function calcTotalPrice (isCartExist){
    isCartExist.totalCartPrice =
        isCartExist.cartItems.reduce((prev,item)=> prev += item.quantity * item.price , 0)

    if(isCartExist.discount){  

       isCartExist.totalPriceAfterDiscount = 
           isCartExist.totalCartPrice - (isCartExist.totalCartPrice * isCartExist.discount) / 100
    }
}


const addToCart = catchError(async(req,res,next)=>{
   const isCartExist = await Cart.findOne({user:req.user._id})
   const product = await Product.findById(req.body.product)

   if(!product) return next(new AppError("Product not found" , 404))

   req.body.price = product.price

   if(req.body.quantity>product.stock) return next(new AppError("Over than Stock and Sold Out" , 404))
   
   if(!isCartExist){
      let cart = new Cart({
        user : req.user._id,
        cartItems : [req.body]
      })
      calcTotalPrice(cart)
      await cart.save()
      res.status(200).json({message:"Success" , cart})
   }else{
    let item = isCartExist.cartItems.find(item => item.product == req.body.product)
    if(item) {
        item.quantity += req.body.quantity || 1  
        if(item.quantity > product.stock) return next(new AppError("Over than Stock and Sold Out" , 404))
    }

    if(!item){
        isCartExist.cartItems.push(req.body)
    }
    calcTotalPrice(isCartExist)
    await isCartExist.save()
    res.status(200).json({message:"Success" , cart:isCartExist})
   }
  
})



const updateQuantity = catchError(async(req,res,next)=>{
   
    let cart = await Cart.findOne({user:req.user._id})
    let item = cart.cartItems.find(item => item.product === req.params.id)
    // if(!item) {
    //     return next(new AppError("Product not found" , 404))
    // }
    item.quantity = req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    cart ||  next(new AppError("Cart not found" , 404))
   !cart || res.status(200).json({message:"Success" , cart})

 })


 const removeItemFormCart = catchError(async(req,res,next)=>{
   
    let cart = await Cart.findOneAndUpdate({user:req.user._id},
    {$pull:{cartItems:{_id:req.params.id}}} , {new:true})
    calcTotalPrice(cart)
    await cart.save()
    cart ||  next(new AppError("Cart not found" , 404))
   !cart || res.status(200).json({message:"Success" , cart})

 })



 const getLoggedUserCart =  catchError(async(req,res,next)=>{
   
    let userCart = await Cart.findOne({user:req.user._id})
    res.status(200).json({message:"Success" , userCart})

 })



 const deleteUserCart =  catchError(async(req,res,next)=>{
   
    let cart = await Cart.findOneAndDelete({user:req.user._id})
    res.status(200).json({message:"Success" , cart})

 })


 const applyCoupon = catchError(async(req,res,next)=>{

    let coupon = await Coupon.findOne({code:req.body.code , expires:{$gte:Date.now()}})
    if(!coupon) return next(new AppError("Oops! This Coupon is invaild"))
    let cart = await Cart.findOne({user:req.user._id})
    cart.discount = coupon.discount
    await cart.save()
    res.status(200).json({message:"Success" , cart})
 })


export{
    addToCart,
    updateQuantity,
    removeItemFormCart,
    getLoggedUserCart,
    deleteUserCart,
    applyCoupon
}
