import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { Brand } from "../../../database/models/brand.model.js"
import { deleteOne } from "../handlers/handlers.js"



const addBrand = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.name) 
    req.body.logo = req.file.filename
    const brand = new Brand(req.body)
    await brand.save()
    res.status(201).json({message:"Success",brand})
})



const getAllBrands= catchError(async(req,res,next)=>{
    const brands = await Brand.find()
    if(brands.length===0) return next(new AppError("Brands Not Founded" , 404))
    res.status(200).json({message:"Success",brands})
})



const getBrand = catchError(async(req,res,next)=>{
    const brand = await Brand.findById(req.params.id)
    brand || next(new AppError("Brand Not Found" , 404))
   !brand || res.status(200).json({message:"Success",brand})
})



const updateBrand = catchError(async(req,res,next)=>{
    req.body.slug =slugify(req.body.name) 
    if(req.file) req.body.logo = req.file.filename
    const brand = await Brand.findByIdAndUpdate(req.params.id , req.body , {new:true})
     brand || next(new AppError("Brand Not Found" , 404))
    !brand || res.status(200).json({message:"Success",brand})
})
 


const deleteBrand = deleteOne(Brand)



export{
    addBrand,
    getBrand,
    getAllBrands,
    updateBrand,
    deleteBrand
}