import { Router } from "express"
import { addBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "./brand.controller.js"
import { uploadSingleFile } from "../../fileUpload/fileUpload.js"
import { validate } from "../../middleware/validate.js"
import { addBrandValidation, updateBrandValidation } from "./brand.validation.js"
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js"


const brandRouter = Router()

brandRouter
.route('/')
.post(protectedRoutes , allowedTo('admin') , uploadSingleFile('logo' , 'brands'), validate(addBrandValidation) ,addBrand)
.get(getAllBrands)

brandRouter
.route('/:id')
.put(protectedRoutes , allowedTo('admin') ,uploadSingleFile('logo' , 'brands'),validate(updateBrandValidation),updateBrand)
.get(getBrand)
.delete(protectedRoutes , allowedTo('admin') ,deleteBrand)




export default brandRouter