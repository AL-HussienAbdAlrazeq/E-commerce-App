import { Router } from "express";
import {
  addCategoryCloud,
  deleteCategoryCloud,
  getAllCategories,
  getCategory,
  updateCategoryCloud,
} from "./category.controller.js";
import { validate } from "../../middleware/validate.js";
import {
  addCategoryValidation,
  updateCategoryValidation,
} from "./category.validation.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { uploadSingleFile } from "../../utils/multer.cloud.js";


const categoryRouter = Router();

categoryRouter.use("/:category/subcategories", subCategoryRouter);
categoryRouter.post(
  "/",
  protectedRoutes,
  allowedTo("admin"),
  uploadSingleFile("image" , "categories"),
  validate(addCategoryValidation),
  addCategoryCloud
);
categoryRouter.get("/", getAllCategories);
categoryRouter.put(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  uploadSingleFile("image" , "categories"),
  validate(updateCategoryValidation),
  updateCategoryCloud
);
categoryRouter.get("/:id", getCategory);
categoryRouter.delete(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  uploadSingleFile("image" , "categories"),
  deleteCategoryCloud
);

export default categoryRouter;
