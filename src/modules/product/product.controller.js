import slugify from "slugify";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/handlers.js";
import { Brand } from "../../../database/models/brand.model.js";
import { Category } from "../../../database/models/category.model.js";
import { SubCategory } from "../../../database/models/subCategory.model.js";
import cloudinary from "../../utils/cloudinary.js";

// FILESYSTEM
// const addProduct = catchError(async (req, res, next) => {
//       const brandExist = await Brand.findOne({ _id:brand });
//       if (!brandExist) return next(new AppError("Brand Not Found", 404));

//       const categoryExist = await Category.findOne({ _id:category});
//       if (!categoryExist) return next(new AppError("Category Not Found", 404));

//     const subCategoryExist = await SubCategory.findOne({ _id:subCategory});
//       if (!subCategoryExist) return next(new AppError("SubCategory Not Found", 404));

//       const productExist = await SubCategory.findOne({ _id:product});
//       if (!productExist) return next(new AppError("Product Not Found", 404));

//   req.body.slug = slugify(req.body.title);
//   req.body.imageCover = req.files.imageCover[0].filename;
//   req.body.images = req.files.images.map((img) => img.filename);
//   const product = new Product(req.body);

// //   if(req.files){
// //       product.imageCover = req.files.filename
// //       product.images = req.files.filename
// //   }
//   await product.save();
//   res.status(201).json({ message: "Success", product });
// });

// CLOUDINARY
const addProductCloud = catchError(async (req, res, next) => {
  const {
    description,
    price,
    stock,
    category,
    brand,
    subCategory,
    title,
    discount,
  } = req.body;
  const brandExist = await Brand.findOne({ _id: brand });
  if (!brandExist) return next(new AppError("Brand Not Found", 404));

  const categoryExist = await Category.findOne({ _id: category });
  if (!categoryExist) return next(new AppError("Category Not Found", 404));

  const subCategoryExist = await SubCategory.findOne({ _id: subCategory });
  if (!subCategoryExist)
    return next(new AppError("SubCategory Not Found", 404));

  const productExist = await Product.findOne({ title: title });
  if (productExist) return next(new AppError("Product already exist", 404));

  const priceAfterDiscount = price - (price * (discount || 0)) / 100;

  if (!req.files) {
    return next(new AppError("image is required", 404));
  }
  const list = [];
  for (const file of req.files.images) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      {
        folder: "E-commerce/products/images",
      }
    );
    list.push({ secure_url, public_id });
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.imageCover[0].path,
    {
      folder: "E-commerce/products/mainImage",
    }
  );
  const product = await Product.create({
    title,
    slug: slugify(title, {
      lower: true,
      replacement: "-",
    }),
    priceAfterDiscount,
    discount,
    description,
    price,
    imageCover: { secure_url, public_id },
    images: list,
    brand,
    stock,
    category,
    subCategory,
    createdBy: req.user.userId,
  });
  res.status(201).json({ message: "Success", product });
});

const getAllProducts = catchError(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Product.find().populate('category').populate('subCategory').populate('brand'), req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();
  const products = await apiFeatures.mongooseQuery;
  products.map((ele) => {
    ele.createdBy = undefined;
  });
  if (products.length === 0)
    return next(new AppError("Products Not Founded", 404));
  res
    .status(200)
    .json({ message: "Success", page: apiFeatures.pageNumber, products });
});

const getProduct = catchError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category').populate('subCategory').populate('brand');
  product || next(new AppError("Product Not Found", 404));
  !product || res.status(200).json({ message: "Success", product });
});

// FILESYSTEM

// const updateProduct = catchError(async (req, res, next) => {
//   req.body.slug = slugify(req.body.title);
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   product || next(new AppError("Brand Not Found", 404));
//   !product || res.status(200).json({ message: "Success", product });
// });

// CLOUDINARY
const updateProductCloud = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const { price, discount } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (price && discount) {
    product.priceAfterDiscount = price - price * (discount / 100);
    product.price = price;
    product.discount = discount;
  } else if (price) {
    product.priceAfterDiscount = price - price * (product.discount / 100);
    product.price = price;
  } else if (discount) {
    product.priceAfterDiscount =
      product.price - product.price * (discount / 100);
    product.discount = discount;
  }
  if (req.files) {
    if (req.files?.imageCover?.length) {
      await cloudinary.uploader.destroy(product.imageCover.public_id);
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.files.imageCover[0].path,
        {
          folder: "E-commerce/products/mainImage",
        }
      );
      product.imageCover = { secure_url, public_id };
    }
    if (req.files?.images?.length) {
      await cloudinary.api.delete_resources_by_prefix(
        "E-commerce/products/images"
      );
      let list = [];
      for (const file of req.files.images) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(
          file.path,
          {
            folder: "E-commerce/products/images",
          }
        );
        list.push({ secure_url, public_id });
      }
      product.images = list;
    }
  }
  await product.save();
  product || next(new AppError("Product Not Found", 404));
  !product || res.status(200).json({ message: "Success", product });
});

// FILESYSTEM 
// const deleteProduct = deleteOne(Product);

// CLOUDINARY
const deleteProductCloud = catchError(async (req, res, next) => {
 const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    await cloudinary.api.delete_resources_by_prefix(
      "E-commerce/products/mainImage"
    );
    await cloudinary.api.delete_resources_by_prefix(
      "E-commerce/products/images"
    );
  }else{
    next(new AppError("Product Not Found", 404));
  }
  res.status(200).json({ message: "Success", product });
});


export { addProductCloud, getAllProducts, getProduct, updateProductCloud  , deleteProductCloud };
