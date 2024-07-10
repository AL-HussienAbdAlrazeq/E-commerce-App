import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";

const categoryRouter = Router();

categoryRouter.post('/' , addCategory)
categoryRouter.get('/', getAllCategories)
categoryRouter.put('/:id' , updateCategory)
categoryRouter.get('/:id' , getCategory)
categoryRouter.delete('/:id',deleteCategory)



export default categoryRouter;