
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { Coupon } from "../../../database/models/coupon.model.js"





const addCoupon = catchError(async(req,res,next)=>{
    const{code} = req.body
    let isExist = await Coupon.findOne({code})
    if(isExist) return next(new AppError("Coupon Exist" , 409))
    const coupon = new Coupon(req.body)
    await coupon.save()
    res.status(201).json({message:"Success",coupon})
})



const getAllCoupons= catchError(async(req,res,next)=>{

    const apiFeatures = new ApiFeatures(Coupon.find() , req.query).pagination().fields().filter().sort().search()
    const coupons = await apiFeatures.mongooseQuery
    if(coupons.length===0) return next(new AppError("Coupons Not Founded" , 404))
    res.status(200).json({message:"Success", page:apiFeatures.pageNumber ,coupons})

})



const getCoupon = catchError(async(req,res,next)=>{
    const coupon = await Coupon.findById(req.params.id)
    coupon || next(new AppError("Coupon Not Found" , 404))
   !coupon || res.status(200).json({message:"Success",coupon})
})



const updateCoupon = catchError(async(req,res,next)=>{
    const coupon = await Coupon.findByIdAndUpdate(req.params.id , req.body , {new:true})
     coupon || next(new AppError("Coupon not found or you are not created this coupon" , 404))
    !coupon || res.status(200).json({message:"Success",coupon})
})
 


const deleteCoupon = catchError(async(req,res,next)=>{
    const coupon = await Coupon.findByIdAndDelete(req.params.id )
    coupon || next(new AppError("Coupon Not Found or you are not created this coupon" , 404))
   !coupon || res.status(200).json({message:"Success",coupon})
})



export{
    addCoupon,
    getCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon
}