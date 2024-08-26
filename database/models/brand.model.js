import mongoose, { Types } from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Name is required"],
      trim: true,
      required: true,
      minLength: [2, "Too Short Category Name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    logo: {
      secure_url: String,
      public_id: String,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// brandSchema.post('init' , (doc)=>{
//   if(doc.logo)  doc.logo = process.env.BASE_URL+'brands/'+ doc.logo
// })

export const Brand = mongoose.model("Brand", brandSchema);
