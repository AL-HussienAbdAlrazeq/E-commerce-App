import { Router } from "express";
import {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategory,
  updateSubCategory,
} from "./subCategory.controller.js";
import { validate } from "../../middleware/validate.js";
import {
  addSubCategoryValidation,
  updateSubCategoryValidation,
} from "./subCategory.validation.js";

const subCategoryRouter = Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .post(validate(addSubCategoryValidation), addSubCategory)
  .get(getAllSubCategories);

subCategoryRouter
  .route("/:id")
  .put(validate(updateSubCategoryValidation), updateSubCategory)
  .get(getSubCategory)
  .delete(deleteSubCategory);

export default subCategoryRouter;
