import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "Name is required"],
      required: true,
      minLength: [2, "Too Short Category Name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 3000,
    },
    imageCover: {
      secure_url: String,
      public_id: String,
    },
    images: [
      {
        secure_url: String,
        public_id: String,
      },
    ],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
    },
    discount: Number,
    sold: Number,
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: Types.ObjectId,
      required: true,
      ref: "Category",
    },
    subCategory: {
      type: Types.ObjectId,
      required: true,
      ref: "SubCategory",
    },
    brand: {
      type: Types.ObjectId,
      required: true,
      ref: "Brand",
    },
    rateAverage: {
      type: Number,
      min: 0,
      max: 5,
    },
    rateCount: Number,
    createdBy: {
      type: Types.ObjectId,
      // required:true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

productSchema.virtual("Reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});
productSchema.pre("findOne", function () {
  this.populate("Reviews");
});

// productSchema.post("init", (doc) => {
//   if (doc.imageCover)
//     doc.imageCover = process.env.BASE_URL + "products/" + doc.imageCover;
//   if (doc.images)
//     doc.images = doc.images.map(
//       (img) => process.env.BASE_URL + "products/" + img
//     );
// });

export const Product = mongoose.model("Product", productSchema);
