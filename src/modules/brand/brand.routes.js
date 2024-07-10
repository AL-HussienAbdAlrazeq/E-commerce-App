import { Router } from "express"
import { addBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "./brand.controller.js"


const brandRouter = Router()

brandRouter.route('/').post( addBrand).get(getAllBrands)

brandRouter.route('/:id').put(updateBrand).get(getBrand).delete(deleteBrand)




export default brandRouter