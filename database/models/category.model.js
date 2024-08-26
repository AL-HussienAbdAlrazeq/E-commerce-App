import mongoose, { Types } from "mongoose";

const categorySchema = new mongoose.Schema(
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
      unique: [true, "Name is required"],
      lowercase: true,
    },
    image: {
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

// categorySchema.post('init' , (doc)=>{
//  if(doc.image)  doc.image = process.env.BASE_URL+'categories/'+doc.image
// })

export const Category = mongoose.model("Category", categorySchema);
