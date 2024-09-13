import { Router } from "express";
import {
  addToCart,
  applyCoupon,
  clearCart,
  deleteUserCart,
  getLoggedUserCart,
  removeItemFormCart,
  updateQuantity,
} from "./cart.controller.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validate } from "../../middleware/validate.js";
import { addCartValidation, UpdateCartValidation } from "./cart.validation.js";

const cartRouter = Router();

cartRouter
  .route("/")
  .post(protectedRoutes, allowedTo("user"),validate(addCartValidation), addToCart)
  .get(protectedRoutes, allowedTo("user"), getLoggedUserCart)
  .delete(protectedRoutes, allowedTo("user","admin"), deleteUserCart);
cartRouter
  .route("/:id")
  .put(protectedRoutes, allowedTo("user"),validate(UpdateCartValidation), updateQuantity)
  .delete(protectedRoutes, allowedTo("user"), removeItemFormCart);

cartRouter.post(
  "/apply-coupon",
  protectedRoutes,
  allowedTo("user", "admin"),
  applyCoupon
);

cartRouter.put("/", protectedRoutes, allowedTo("user"), clearCart);

export default cartRouter;
