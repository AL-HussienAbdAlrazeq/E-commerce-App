import slugify from "slugify"
import { Category } from "../../../database/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"



const addCategory = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.name) 
    const category = new Category(req.body)
    await category.save()
    res.status(201).json({message:"Success",category})
})



const getAllCategories = catchError(async(req,res,next)=>{
    const categories = await Category.find()
    res.status(200).json({message:"Success",categories})
})



const getCategory = catchError(async(req,res,next)=>{
    const category = await Category.findById(req.params.id)
    category || next(new AppError("Category Not Found" , 404))
   !category || res.status(200).json({message:"Success",category})
})



const updateCategory = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.name) 
    const category = await Category.findByIdAndUpdate(req.params.id , req.body , {new:true})
     category || next(new AppError("Category Not Found" , 404))
    !category || res.status(200).json({message:"Success",category})
})



const deleteCategory = catchError(async(req,res,next)=>{
    const category = await Category.findByIdAndDelete(req.params.id)
    category || next(new AppError("Category Not Found" , 404))
   !category || res.status(200).json({message:"Success",category})
})




export{
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}