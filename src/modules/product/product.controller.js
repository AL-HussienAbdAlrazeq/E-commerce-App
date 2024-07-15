import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { Product } from "../../../database/models/product.model.js"
import { deleteOne } from "../handlers/handlers.js"



const addProduct = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.title) 
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(img=>img.filename)
    const product = new Product(req.body)
    await product.save()
    res.status(201).json({message:"Success",product})
})

  

const getAllProducts= catchError(async(req,res,next)=>{
    const products = await Product.find()
    if(products.length===0) return next(new AppError("Products Not Founded" , 404))
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
 


const deleteProduct = deleteOne(Product)


export{
    addProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}