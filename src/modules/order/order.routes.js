import { Router } from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { createCashOrder, createCheckOutSession, getAllOrders, getUserOrder } from "./order.controller.js";


const orderRouter = Router({mergeParams:true})
orderRouter.route('/:id')
.post(protectedRoutes , allowedTo('user'),createCashOrder)

orderRouter.get('/users',protectedRoutes , allowedTo('user','admin'),getUserOrder)
orderRouter.route('/')
.get(protectedRoutes , allowedTo('admin'),getAllOrders)


orderRouter.post('/checkout/:id' ,protectedRoutes , allowedTo('user'), createCheckOutSession)

export default orderRouter
