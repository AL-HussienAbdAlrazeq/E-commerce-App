import { Router } from "express"
import { validate } from "../../middleware/validate.js"
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller.js"
import { addUserValidation, updateUserValidation } from "./user.validation.js"
import { checkEmail } from "../../middleware/checkEmail.js"


const userRouter = Router()

userRouter.route('/')
.post(validate(addUserValidation),checkEmail,addUser)
.get(getAllUsers)

userRouter.route('/:id')
.put(validate(updateUserValidation),updateUser)
.get(getUser)
.delete(deleteUser)




export default userRouter