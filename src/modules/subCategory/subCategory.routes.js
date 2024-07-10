import { Router } from "express"
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "./subCategory.controller.js"


const subCategoryRouter = Router()

subCategoryRouter.route('/').post( addSubCategory).get(getAllSubCategories)

subCategoryRouter.route('/:id').put(updateSubCategory).get(getSubCategory).delete(deleteSubCategory)




export default subCategoryRouter