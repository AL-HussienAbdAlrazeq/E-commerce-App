import authRouter from "../auth/auth.routes.js"
import addressRouter from "./address/address.routes.js"
import brandRouter from "./brand/brand.routes.js"
import categoryRouter from "./category/category.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import subCategoryRouter from "./subCategory/subCategory.routes.js"
import userRouter from "./user/user.routes.js"
import wishListRouter from "./wishList/wishList.routes.js"


export const bootstrap =(app)=>{
    
    app.use('/api/categories',categoryRouter)
    app.use('/api/subcategories',subCategoryRouter)
    app.use('/api/brands',brandRouter)
    app.use('/api/products' , productRouter)
    app.use('/api/reviews' , reviewRouter)
    app.use('/api/users' , userRouter)
    app.use('/api/auth' , authRouter)
    app.use('/api/wishlists' , wishListRouter)
    app.use('/api/addresses' , addressRouter)

}