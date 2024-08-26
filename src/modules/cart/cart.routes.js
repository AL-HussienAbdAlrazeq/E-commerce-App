import { Router } from "express";
import { addToCart, applyCoupon, deleteUserCart, getLoggedUserCart, removeItemFormCart, updateQuantity } from "./cart.controller.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";


const cartRouter = Router()

cartRouter.route('/').
post(protectedRoutes,allowedTo('user'), addToCart)
.get(protectedRoutes,allowedTo('user'),getLoggedUserCart)
.delete(protectedRoutes,allowedTo('user'),deleteUserCart)
cartRouter.route('/:id')
.put(protectedRoutes,allowedTo('user'),updateQuantity)
.delete(protectedRoutes,allowedTo('user'),removeItemFormCart)

cartRouter.post('/apply-coupon' ,protectedRoutes,allowedTo('user' , 'admin'), applyCoupon)


export default cartRouter