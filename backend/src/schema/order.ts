import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Context } from "../app";
import { Order, OrderDoc } from "../models/order";
import sendEmail from "../utils/sendMail/sendMail";
import { DishInputType, DishType } from "./dish";

const coupons = [{ couponName: "test20", discount: 20 }];
const RESULT_PER_PAGE = 20;

export const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    phone: { type: GraphQLString },
    dishes: { type: new GraphQLList(DishType) },
    firstName: { type: GraphQLString },
    surname: { type: GraphQLString },
    street: { type: GraphQLString },
    streetNumber: { type: GraphQLString },
    email: { type: GraphQLString },
    city: { type: GraphQLString },
    paymentMethod: { type: GraphQLString },
    couponAppliedPercentage: { type: GraphQLInt },
  }),
});

const OrdersResponseType = new GraphQLObjectType({
  name: "Orders",
  fields: () => ({
    orders: { type: new GraphQLList(OrderType) },
    count: { type: GraphQLInt },
    page: { type: GraphQLInt },
    allPages: { type: GraphQLInt },
  }),
});

export const CouponType = new GraphQLObjectType({
  name: "Coupon",
  fields: () => ({
    couponApplied: { type: GraphQLString },
    couponAppliedPercentage: { type: GraphQLInt },
  }),
});

export const useCoupon = {
  type: CouponType,
  args: {
    couponApplied: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent: any, args: any) => {
    const coupon = coupons.find((coupon) => coupon.couponName === args.couponApplied);
    if (!coupon) throw new Error("Invalid coupon");
    console.log(coupon);
    return { couponApplied: coupon.couponName, couponAppliedPercentage: coupon.discount };
  },
};

export const createOrder = {
  type: OrderType,
  args: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    dishes: { type: new GraphQLList(DishInputType) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    surname: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    streetNumber: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    paymentMethod: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    couponApplied: { type: GraphQLString },
  },
  resolve: async (parent: any, args: any) => {
    const date = new Date(args.date);
    const order = Order.build({ ...args, date });
    if (args.couponApplied) {
      const coupon = coupons.find((coupon) => coupon.couponName === args.couponApplied);
      if (!coupon) throw new Error("Invalid coupon");
      order.couponAppliedPercentage = coupon.discount;
    }
    console.log(order);
    await order.save();
    generateHTMLStringForOrder(order);
    sendEmail(order.email, "FoodCatch: Order confirmed!", generateHTMLStringForOrder(order));
    return order;
  },
};

export const getOrder = {
  type: OrderType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent: any, args: any) => {
    const order = await Order.findById(args.id);
    console.log(order);
    if (!order) throw new Error("Order with given ID not found");
    return order;
  },
};

export const getOrders = {
  type: OrdersResponseType,
  args: {
    page: { type: GraphQLInt },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    const { req, res } = context;
    const page = args.page || 1;
    if (!(req as any).email) throw new Error("You are not logged in as an admin!");
    const orders = await Order.find()
      .limit(RESULT_PER_PAGE)
      .skip((page - 1) * RESULT_PER_PAGE)
      .sort("-date");

    const count = await Order.count();
    if (!orders || !orders.length) throw new Error("No orders found!");
    return { orders, count, page, allPages: Math.ceil(count / RESULT_PER_PAGE) };
  },
};

const generateHTMLStringForOrder = (order: OrderDoc) => {
  return /*html*/ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmed</title>
    </head>
    <body>
      <h1> Hello ${order.firstName}, your order is confirmed! </h1>
      <h2> For more details <a href='${process.env.SITE_URL}/summary/${order.id}'>Click here</a> </h2>
      <h2> Order: </h2>
      ${order.dishes.map((dish) => `<h3>${dish.name}: ${dish.price} zł x${dish.quantity}</h3>`).join("")}
    </body>
  </html>`;
};
