import Stripe from "stripe";
import { Cart } from "../../../database/models/cart.model.js";
import { Order } from "../../../database/models/order.model.js";
import { Product } from "../../../database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import "dotenv/config";

const stripe = new Stripe(
  process.env.SECRET_PAYMENT_KEY 
);

const createCashOrder = catchError(async (req, res, next) => {
  //  get user cart by ID
  const cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("Cart not found", 404));

  // Total order price
  // let totalOrderPrice = cart.totalPriceAfterDiscount || cart.totalCartPrice;
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalCartPrice;

  // Create Order
  let order = new Order({
    user: req.user._id,
    orderItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });

  // increment Sold decrement Stock
  if (order) {
    let options = cart.cartItems.map((pro) => {
      return {
        updateOne: {
          filter: { _id: pro.product },
          update: {
            $inc: {
              sold: pro.quantity,
              stock: -pro.quantity,
              quantity: -pro.quantity,
            },
          },
        },
      };
    });
    await Product.bulkWrite(options);
    await order.save();
  }else{
    return next(new AppError("Error Occur") , 409)
  }

  // clear user cart
  await Cart.findByIdAndDelete(cart._id);

  res.status(200).json({ message: "Success", order });
});

const getUserOrder = catchError(async (req, res, next) => {
  let filterObj = {};
  if (req.params.id) filterObj.id = req.params.id;
  const orders = await Order.findOne(filterObj).populate("orderItems.product");
  res.status(200).json({ message: "Success", orders });
});

const getAllOrders = catchError(async (req, res, next) => {
  const orders = await Order.find().populate("orderItems.product");
  res.status(200).json({ message: "Success", orders });
});

const createCheckOutSession = catchError(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) return next(new AppError("Cart not found", 404));
  let totalOrderPrice = cart.totalPriceAfterDiscount || cart.totalCartPrice;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.SUCCESS_URL}?success=true`,
    cancel_url: `${process.env.CANCEL_URL}?canceled=true`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });
  res.status(200).json({ message: "Success", session });
});

export { createCashOrder, getAllOrders, getUserOrder, createCheckOutSession };
