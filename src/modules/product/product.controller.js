import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { Product } from "../../../database/models/product.model.js"



const addProduct = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.title) 
    const product = new Product(req.body)
    await product.save()
    res.status(201).json({message:"Success",product})
})



const getAllProducts= catchError(async(req,res,next)=>{
    const products = await Product.find()
    res.status(200).json({message:"Success",products})
})



const getProduct = catchError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    product || next(new AppError("Brand Not Found" , 404))
   !product || res.status(200).json({message:"Success",product})
})



const updateProduct = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.title) 
    const product = await Product.findByIdAndUpdate(req.params.id , req.body , {new:true})
     product || next(new AppError("Brand Not Found" , 404))
    !product || res.status(200).json({message:"Success",product})
})
 


const deleteProduct = catchError(async(req,res,next)=>{
    const product = await Product.findByIdAndDelete(req.params.id)
    product || next(new AppError("Brand Not Found" , 404))
   !product || res.status(200).json({message:"Success",product})
})



export{
    addProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}