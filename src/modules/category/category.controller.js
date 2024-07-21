import slugify from "slugify"
import fs from "fs"
import path from "path"
import { Category } from "../../../database/models/category.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/ApiFeatures.js"



const addCategory = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.name) 
    req.body.image = req.file.filename
    const category = new Category(req.body)
    await category.save()
    res.status(201).json({message:"Success",category})
})



const getAllCategories = catchError(async(req,res,next)=>{

    const apiFeatures = new ApiFeatures(Category.find() , req.query).pagination().fields().filter().sort().search()
    const categories = await apiFeatures.mongooseQuery
    if(categories.length===0) return next(new AppError("Categories Not Founded" , 404))
    res.status(200).json({message:"Success", page:apiFeatures.pageNumber ,categories})
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

    category || next(new AppError("Category Not Found" , 404))
    // fs.rm(path.join(path.resolve(),'../',category.image) , (err)=>{
    //     if(err) return next(new AppError('Failed to delete the old image file' ,500))
    // })
    category.image = req.file.path
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