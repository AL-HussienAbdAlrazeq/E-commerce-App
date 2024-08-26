import slugify from "slugify";
import { Category } from "../../../database/models/category.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { deleteFile } from "../../utils/deleteFile.js";
import { SubCategory } from "../../../database/models/subCategory.model.js";
import cloudinary from "../../utils/cloudinary.js";

// FILESYSTEM
// const addCategory = catchError(async (req, res, next) => {
//   const categoryExist = await Category.findOne({ name: req.body.name });
//   if (categoryExist)
//     return next(new AppError("Can't add two categories at the same name", 409));
//   req.body.slug = slugify(req.body.name);
//   const category = new Category(req.body);
//   if (req.file) {
//     category.image = req.file.filename;
//   }
//   await category.save();
//   res.status(201).json({ message: "Success", category });
// });

// CLOUDINARY

// CLOUDINARY
const addCategoryCloud = catchError(async (req, res, next) => {
  const categoryExist = await Category.findOne({ name: req.body.name });
  if (categoryExist)
    return next(new AppError("Can't add two categories at the same name", 409));
  req.body.slug = slugify(req.body.name);
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "E-commerce/categories",
    }
  );
  req.body.image = { secure_url, public_id };
  const category = new Category(req.body);
  await category.save();
  res.status(201).json({ message: "Success", category });
});

const getAllCategories = catchError(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();
  const categories = await apiFeatures.mongooseQuery;
  if (categories.length === 0)
    return next(new AppError("Categories Not Founded", 404));
  res
    .status(200)
    .json({ message: "Success", page: apiFeatures.pageNumber, categories });
});

const getCategory = catchError(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  category || next(new AppError("Category Not Found", 404));
  !category || res.status(200).json({ message: "Success", category });
});

// FILESYSTEM

// const updateCategory = catchError(async (req, res, next) => {
//   req.body.slug = slugify(req.body.name);
//   const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   if (!category) {
//     return next(new AppError("Category Not Found", 404));
//   }
//   if (req.file) {
//     let imagePath = category.image.split(process.env.BASE_URL)[1];
//     // Delete Old Image
//     deleteFile(imagePath);
//     // Update New Image
//     category.image = req.file.path;
//   }
//   const updatedCategory = await category.save();
//   if (!updatedCategory) {
//     return next(new AppError("Image Not Found", 404));
//   }

//   res.status(200).json({ message: "Success", category });
// });

// CLOUDINARY
const updateCategoryCloud = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) {
    return next(new AppError("Category Not Found", 404));
  }
  if (req.file) {
    await cloudinary.uploader.destroy(category.image.public_id);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: "E-commerce/categories",
      }
    );
    category.image = { secure_url, public_id };
  }
  const updatedCategory = await category.save();
  if (!updatedCategory) {
    return next(new AppError("Image Not Found", 404));
  }

  res.status(200).json({ message: "Success", category });
});

// FILESYSTEM
// const deleteCategory = catchError(async (req, res, next) => {
//   const category = await Category.findByIdAndDelete(req.params.id);
//   if (!category) {
//     next(new AppError("Category Not Found", 404));
//   }
//   const imagePath = category.image.split(process.env.BASE_URL)[1];
//   fs.unlinkSync(imagePath, (err) => {
//     if (err) return next(new AppError("Image Not Found", 404));
//   });
//   res.status(200).json({ message: "Deleted", category });
// });

// CLOUDINARY
const deleteCategoryCloud = catchError(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOneAndDelete({
    _id: id,
    createdBy: req.user.userId,
  });

  if (!category) {
    next(new AppError("Category Not Found OR You Don't Have Permission", 404));
  }
  await SubCategory.deleteMany({ category: category._id });
  await cloudinary.api.delete_resources_by_prefix("E-commerce/categories");
  // await cloudinary.api.delete_folder("E-commerce/categories");

  res.status(200).json({ message: "Deleted", category });
});

export {
  addCategoryCloud,
  getAllCategories,
  getCategory,
  updateCategoryCloud,
  deleteCategoryCloud,
};
