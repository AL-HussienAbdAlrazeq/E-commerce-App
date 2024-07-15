import slugify from "slugify"
import fs from "fs"
import path from "path"
import { Category } from "../../../database/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../handlers/handlers.js"



const addCategory = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.name) 
    req.body.image = req.file.filename
    const category = new Category(req.body)
    await category.save()
    res.status(201).json({message:"Success",category})
})



const getAllCategories = catchError(async(req,res,next)=>{
    const categories = await Category.find()
    if(categories.length===0) return next(new AppError("Categories Not Founded" , 404))
    res.status(200).json({message:"Success",categories})
})



const getCategory = catchError(async(req,res,next)=>{
    const category = await Category.findById(req.params.id)
    category || next(new AppError("Category Not Found" , 404))
   !category || res.status(200).json({message:"Success",category})
})



const updateCategory = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.name) 
    if(req.file) req.body.image = req.file.filename
    const category = await Category.findByIdAndUpdate(req.params.id , req.body , {new:true})
    // const oldImage = category.image
    // category.image = req.file.path
    // if(oldImage){
    //     fs.rmSync(oldImage , {force:true})
    // }
    category || next(new AppError("Category Not Found" , 404))
    !category || res.status(200).json({message:"Success",category})
})



const deleteCategory = deleteOne(Category)




export{
    addCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}