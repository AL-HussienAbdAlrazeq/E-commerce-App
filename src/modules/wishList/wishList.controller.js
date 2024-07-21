
import { User } from "../../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"




const addToWishList = catchError(async(req,res,next)=>{
    const wishlist = await User.findByIdAndUpdate(req.user._id , {$addToSet:{wishList:req.body.product}} , {new:true})
    wishlist || next(new AppError("Wishlist Not Found" , 404))
    !wishlist || res.status(200).json({message:"Success",wishlist:wishlist.wishList})
})


const removeFromWishList = catchError(async(req,res,next)=>{
    const wishlist = await User.findByIdAndUpdate(req.user._id , {$pull:{wishList:req.params.id}} , {new:true})
    wishlist || next(new AppError("Wishlist Not Found" , 404))
    !wishlist || res.status(200).json({message:"Success",wishlist:wishlist.wishList})
})

const getLoggedUserWishList = catchError(async(req,res,next)=>{
    const wishlist = await User.findById(req.user._id ).populate('wishList')
    wishlist || next(new AppError("Wishlist Not Found" , 404))
    !wishlist || res.status(200).json({message:"Success",wishlist:wishlist.wishList})
})

export{
    addToWishList,
    removeFromWishList,
    getLoggedUserWishList
}