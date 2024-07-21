import { Router } from "express"
import { validate } from "../../middleware/validate.js"
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js"
import { addReviewValidation, updateReviewValidation } from "./review.validation.js"
import { addReview, deleteReview, getAllReviews, getReview, updateReview } from "./review.controller.js"


const reviewRouter = Router()

reviewRouter
.route('/')
.post(protectedRoutes , allowedTo('user') , validate(addReviewValidation) ,addReview)
.get(getAllReviews)

reviewRouter
.route('/:id')
.put(protectedRoutes , allowedTo('user') ,validate(updateReviewValidation),updateReview)
.get(getReview)
.delete(protectedRoutes , allowedTo('admin','user') ,deleteReview)




export default reviewRouter