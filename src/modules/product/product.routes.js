import { Router } from "express"
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./product.controller.js"
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js"
import { validate } from "../../middleware/validate.js"
import { addProductValidation, updateProductValidation } from "./product.validation.js"



const productRouter = Router()

productRouter
.route('/')
.post( uploadMixOfFiles([{ name: 'imageCover', maxCount: 1 }, { name: 'images', maxCount: 10 }],'products'),validate(addProductValidation),addProduct)
.get(getAllProducts)

productRouter.
route('/:id').
put(uploadMixOfFiles([{name:'imageCover' , maxCount:1} , {name:'images' , maxCount:10}],'products'),validate(updateProductValidation),updateProduct).
get(getProduct).
delete(deleteProduct)




export default productRouter