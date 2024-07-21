import { Router } from "express"
import { addToWishList, getLoggedUserWishList, removeFromWishList } from "./wishList.controller.js"
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js"
import { validate } from "../../middleware/validate.js"
import { addToWishListValidation } from "./wishList.validation.js"



const wishListRouter = Router()

wishListRouter.route('/')
.patch(protectedRoutes,allowedTo('user'),validate(addToWishListValidation),addToWishList)
.get(protectedRoutes,allowedTo('user','admin'),getLoggedUserWishList)
wishListRouter.route('/:id')
.delete(protectedRoutes,allowedTo('user','admin'),removeFromWishList)




export default wishListRouter