import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation, updateCategoryValidation } from "./category.validation.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";

const categoryRouter = Router();

categoryRouter.use('/:category/subcategories',subCategoryRouter)
categoryRouter.post('/' ,protectedRoutes,allowedTo('admin') ,uploadSingleFile('image' , 'categories') , validate(addCategoryValidation) ,addCategory)
categoryRouter.get('/', getAllCategories)
categoryRouter.put('/:id' , protectedRoutes,allowedTo( 'admin') ,uploadSingleFile('image' , 'categories'),validate(updateCategoryValidation) ,updateCategory)
categoryRouter.get('/:id' , getCategory)
categoryRouter.delete('/:id',protectedRoutes,allowedTo('admin'),deleteCategory)



export default categoryRouter;