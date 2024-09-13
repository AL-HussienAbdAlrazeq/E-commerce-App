import mongoose, { Types } from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: Types.ObjectId, ref: "User" },
    cartItems: [
      {
        product: { type: Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
        price: Number,
      },
    ],
    totalCartPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
