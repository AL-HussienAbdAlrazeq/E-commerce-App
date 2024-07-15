import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { SubCategory } from "../../../database/models/subCategory.model.js"
import { deleteOne } from "../handlers/handlers.js"



const addSubCategory = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.name) 
    const subCategory = new SubCategory(req.body)
    await subCategory.save()
    res.status(201).json({message:"Success",subCategory})
})



const getAllSubCategories = catchError(async(req,res,next)=>{
    const subCategories = await SubCategory.find().populate('category')
    if(subCategories.length===0) return next(new AppError("SubCategories Not Founded" , 404))
    res.status(200).json({message:"Success",subCategories})
})



const getSubCategory = catchError(async(req,res,next)=>{
    const subCategory = await SubCategory.findById(req.params.id).populate('category')
    subCategory || next(new AppError("SubCategory Not Found" , 404))
   !subCategory || res.status(200).json({message:"Success",subCategory})
})



const updateSubCategory = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.name) 
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id , req.body , {new:true})
     subCategory || next(new AppError("SubCategory Not Found" , 404))
    !subCategory || res.status(200).json({message:"Success",subCategory})
})
 


const deleteSubCategory = deleteOne(SubCategory)


export{
    addSubCategory,
    getAllSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
}