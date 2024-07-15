import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import { addCategoryValidation, updateCategoryValidation } from "./category.validation.js";

const categoryRouter = Router();

categoryRouter.post('/' ,uploadSingleFile('image' , 'categories') , validate(addCategoryValidation) ,addCategory)
categoryRouter.get('/', getAllCategories)
categoryRouter.put('/:id' , uploadSingleFile('image' , 'categories'),validate(updateCategoryValidation) ,updateCategory)
categoryRouter.get('/:id' , getCategory)
categoryRouter.delete('/:id',deleteCategory)



export default categoryRouter;