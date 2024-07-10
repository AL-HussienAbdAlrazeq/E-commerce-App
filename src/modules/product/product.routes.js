import { Router } from "express"
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./product.controller.js"



const productRouter = Router()

productRouter.route('/').post( addProduct).get(getAllProducts)

productRouter.route('/:id').put(updateProduct).get(getProduct).delete(deleteProduct)




export default productRouter