import fs from "fs";
import slugify from "slugify";
import { Brand } from "../../../database/models/brand.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { deleteFile } from "../../utils/deleteFile.js";
import cloudinary from "../../utils/cloudinary.js";

// FILE SYSTEM
// const addBrand = catchError(async (req, res, next) => {
//   const brandExist = await Brand.findOne({ name: req.body.name });
//   if (brandExist)
//     return next(new AppError("Can't add to brands at the same type", 409));
//   req.body.slug = slugify(req.body.name);
//   const brand = new Brand(req.body);
//   if (req.file) {
//     brand.logo = req.file.filename;
//   }
//   await brand.save();
//   res.status(201).json({ message: "Success", brand });
// });

// CLOUDINARY
const addBrandCloud = catchError(async (req, res, next) => {
  const brandExist = await Brand.findOne({ name: req.body.name });
  if (brandExist)
    return next(new AppError("Can't add to brands at the same type", 409));
  req.body.slug = slugify(req.body.name);

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: "E-commerce/brands",
    }
  );
  req.body.logo = { secure_url, public_id };
  const brand = new Brand(req.body);
  await brand.save();
  res.status(201).json({ message: "Success", brand });
});

const getAllBrands = catchError(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(
    Brand.find().populate("createdBy"),
    req.query
  )
    .pagination()
    .fields()
    .filter()
    .sort()
    .search();
  const brands = await apiFeatures.mongooseQuery;
  // if (brands.length === 0) return next(new AppError("Brands Not Founded", 404));
  res
    .status(200)
    .json({ message: "Success", page: apiFeatures.pageNumber, brands });
});

const getBrand = catchError(async (req, res, next) => {
  const brand = await Brand.findById(req.params.id).populate("createdBy");
  brand || next(new AppError("Brand Not Found", 404));
  !brand || res.status(200).json({ message: "Success", brand });
});

// FILE SYSTEM

// const updateBrand = catchError(async (req, res, next) => {
//   req.body.slug = slugify(req.body.name);

//   const brand = await Brand.findByIdAndUpdate(
//     req.params.id,
//     { ...req.body },
//     {
//       new: true,
//     }
//   );
//   if (!brand) {
//     next(new AppError("Brand Not Found", 404));
//   }
//   if (req.file) {
//     let logoPath = brand.logo.split(process.env.BASE_URL)[1];
//     deleteFile(logoPath);
//     brand.logo = req.file.path;
//   }
//   const updatedBrand = await brand.save();
//   if (!updatedBrand) {
//     return next(new AppError("Logo Not Found", 404));
//   }
//   res.status(200).json({ message: "Success", brand });
// });
// CLOUDINARY
const updateBrandCloud = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);

  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!brand) {
    return next(new AppError("Brand Not Found", 404));
  }
  if (req.file) {
    await cloudinary.uploader.destroy(brand.logo.public_id);
    await cloudinary.uploader.upload(req.file.path, {
      folder:"E-commerce/brands",
    });
  }
  const updatedBrand = await brand.save();
  if (!updatedBrand) {
    return next(new AppError("Logo Not Found", 404));
  }
  res.status(200).json({ message: "Success", brand });
});

// FILE SYSTEM
// const deleteBrand = catchError(async (req, res, next) => {
//   const brand = await Brand.findByIdAndDelete(req.params.id);
//   if (!brand) {
//     next(new AppError("Brand Not Found", 404));
//   }
//   const logoPath = brand.logo.split(process.env.BASE_URL)[1];
//   fs.unlink(logoPath, (err) => {
//     if (err) return next(new AppError("Logo Not Found", 404));
//   });
//   res.status(200).json({ message: "Deleted", brand });
// });

// CLOUDINARY
const deleteBrandCloud = catchError(async (req, res, next) => {
  const brand = await Brand.findByIdAndDelete(req.params.id, {
    createdBy: req.user.userId,
  });
  if (!brand) {
    next(new AppError("Brand Not Found", 404));
  }
  await cloudinary.api.delete_resources_by_prefix("E-commerce/brands");
  res.status(200).json({ message: "Deleted", brand });
});

export {
  addBrandCloud,
  deleteBrandCloud,
  getAllBrands,
  getBrand,
  updateBrandCloud,
};
