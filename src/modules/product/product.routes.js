import { Router } from "express";
import {
  addProductCloud,
  deleteProductCloud,
  getAllProducts,
  getProduct,
  updateProductCloud,
} from "./product.controller.js";
import { validate } from "../../middleware/validate.js";
import {
  addProductValidation,
  updateProductValidation,
} from "./product.validation.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { uploadMixOfFiles } from "../../utils/multer.cloud.js";

const productRouter = Router();

productRouter
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    uploadMixOfFiles(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products"
    ),
    validate(addProductValidation),
    addProductCloud
  )
  .get(getAllProducts);

productRouter
  .route("/:id")
  .put(
    protectedRoutes,
    allowedTo("admin", "user"),
    uploadMixOfFiles(
      [
        { name: "imageCover", maxCount: 1 },
        { name: "images", maxCount: 10 },
      ],
      "products"
    ),
    validate(updateProductValidation),
    updateProductCloud
  )
  .get(getProduct)
  // .delete(deleteProduct);

  productRouter.delete('/:id', protectedRoutes, allowedTo('admin'), deleteProductCloud)

export default productRouter;
