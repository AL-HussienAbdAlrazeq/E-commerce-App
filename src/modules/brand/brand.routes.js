import { Router } from "express";
import {
  addBrandCloud,
  deleteBrandCloud,
  getAllBrands,
  getBrand,
  updateBrandCloud,
} from "./brand.controller.js";
// import { fileUpload, uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from "../../middleware/validate.js";
import {
  addBrandValidation,
  updateBrandValidation,
} from "./brand.validation.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { cloudUpload, uploadSingleFile } from "../../utils/multer.cloud.js";

const brandRouter = Router();

brandRouter.post(
  "/",
  protectedRoutes,
  allowedTo("admin"),
  uploadSingleFile("image", "brands"),
  validate(addBrandValidation),
  addBrandCloud
);

brandRouter.get("/", getAllBrands);

brandRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brands"),
    validate(updateBrandValidation),
    updateBrandCloud
  )
  .get(getBrand)
  brandRouter.delete(
    "/:id",
    protectedRoutes,
    allowedTo("admin"),
    uploadSingleFile("image", "brands"),
    deleteBrandCloud
  );

export default brandRouter;
