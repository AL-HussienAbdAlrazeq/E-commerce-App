
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"
import { Review } from "../../../database/models/review.model.js"



const addReview = catchError(async(req,res,next)=>{
    req.body.user = req.user._id
    const isExist = await Review.findOne({user:req.user._id , product:req.body.product})
    if(isExist) return next(new AppError("This user created a review before" , 409))
    const review = new Review(req.body)
    await review.save()
    res.status(201).json({message:"Success",review})
})



const getAllReviews= catchError(async(req,res,next)=>{

    const apiFeatures = new ApiFeatures(Review.find().populate('user').populate('product') , req.query).pagination().fields().filter().sort().search()
    const reviews = await apiFeatures.mongooseQuery
    if(reviews.length===0) return next(new AppError("Reviews Not Founded" , 404))
    res.status(200).json({message:"Success", page:apiFeatures.pageNumber ,reviews})

})



const getReview = catchError(async(req,res,next)=>{
    const review = await Review.findById(req.params.id).populate('user').populate('product')
    review || next(new AppError("Review Not Found" , 404))
   !review || res.status(200).json({message:"Success",review})
})



const updateReview = catchError(async(req,res,next)=>{
    const review = await Review.findOneAndUpdate({_id:req.params.id , user:req.user._id} , req.body , {new:true})
     review || next(new AppError("Review not found or you are not created this review" , 404))
    !review || res.status(200).json({message:"Success",review})
})
 


const deleteReview = catchError(async(req,res,next)=>{
    const review = await Review.findOneAndDelete({_id:req.params.id , user:req.user._id})
    review || next(new AppError("Review Not Found or you are not created this review" , 404))
   !review || res.status(200).json({message:"Success",review})
})



export{
    addReview,
    getReview,
    getAllReviews,
    updateReview,
    deleteReview
}