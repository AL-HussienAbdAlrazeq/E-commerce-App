import { Router } from "express"
import { validate } from "../../middleware/validate.js"
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js"
import { addCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "./coupon.controller.js"
import { addCouponValidation, updateCouponValidation } from "./coupon.validation.js"


const couponRouter = Router()
couponRouter.use(protectedRoutes , allowedTo('admin'))
couponRouter
.route('/')
.post(validate(addCouponValidation) ,addCoupon)
.get(getAllCoupons)

couponRouter
.route('/:id')
.put(validate(updateCouponValidation),updateCoupon)
.get(getCoupon)
.delete(deleteCoupon)




export default couponRouter