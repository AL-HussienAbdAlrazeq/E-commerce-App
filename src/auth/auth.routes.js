import { Router } from "express"
import { changeUserPassword, signin, signup } from "./auth.controller.js"
import { signInValidate, signUpValidate } from "./auth.validation.js"
import { checkEmail } from "../middleware/checkEmail.js"
import { validate } from "../middleware/validate.js"



 const authRouter = Router()

authRouter.post('/signup' ,validate(signUpValidate) ,checkEmail , signup)
authRouter.post('/signin' , validate(signInValidate), signin)
authRouter.patch('/change-password' , changeUserPassword)

export default authRouter

