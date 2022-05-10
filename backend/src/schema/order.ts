import {
  GraphQLBoolean,
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
import { RESULT_PER_PAGE } from "./consts";
import { DishInputType, DishType } from "./dish";
import { checkAuthorization, getFilter } from "./utils";
import stripe from "../utils/stripe";
import { getCouponUtil } from "./coupon";

const DELIVERY_PRICE = 9.99;

const isOrderPaidViaStripe = async (order: OrderDoc) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(order.orderPaymentId);
    const paymentStatus = session.payment_status;
    if (paymentStatus === "paid") return true;
  } catch (error) {
    console.log("CATCH");
    return false;
  }
  return false;
};

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
    paymentUrl: { type: GraphQLString },
    couponAppliedPercentage: { type: GraphQLInt },
    orderPaymentId: { type: GraphQLString },
    orderPaymentProvider: { type: GraphQLString },
    isPaid: { type: GraphQLBoolean },
    isDelivered: { type: GraphQLBoolean },
    notes: { type: GraphQLString },
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
  name: "CouponOld",
  fields: () => ({
    couponApplied: { type: GraphQLString },
    couponAppliedPercentage: { type: GraphQLInt },
  }),
});

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
    orderPaymentId: { type: GraphQLString },
    orderPaymentProvider: { type: GraphQLString },
    isPaid: { type: GraphQLBoolean },
    isDelivered: { type: GraphQLBoolean },
    notes: { type: GraphQLString },
  },
  resolve: async (parent: any, args: any) => {
    const date = new Date(args.date);

    const order = Order.build({ ...args, date });
    if (args.couponApplied) {
      const coupon = await getCouponUtil(args.couponApplied);
      order.couponAppliedPercentage = coupon.percentage;
    }
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.CLIENT_URL}/summary/${order.id}`,
      cancel_url: `${process.env.CLIENT_URL}/summary/${order.id}`,
      payment_method_types: ["card", "p24"],
      mode: "payment",
      line_items: order.dishes.map((item) => ({
        price_data: {
          currency: "pln",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      discounts: [{ coupon: args.couponApplied || undefined }],
      customer_email: args.email,
    });

    order.paymentUrl = stripeSession.url || "";
    order.orderPaymentId = stripeSession.id || "";
    await order.save();

    generateHTMLStringForOrder(order);
    sendEmail(order.email, "FoodCatch: Order confirmed!", generateHTMLStringForOrder(order));
    return order;
  },
};

export const editOrder = {
  type: OrderType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: GraphQLString },
    phone: { type: GraphQLString },
    dishes: { type: new GraphQLList(DishInputType) },
    firstName: { type: GraphQLString },
    surname: { type: GraphQLString },
    street: { type: GraphQLString },
    streetNumber: { type: GraphQLString },
    city: { type: GraphQLString },
    paymentMethod: { type: GraphQLString },
    email: { type: GraphQLString },
    orderPaymentId: { type: GraphQLString },
    orderPaymentProvider: { type: GraphQLString },
    isDelivered: { type: GraphQLBoolean },
    notes: { type: GraphQLString },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    checkAuthorization(context.req);
    const order = Order.findById(args.id);
    if (!order) throw new Error("Order with that ID not found!");
    const fieldsToUpdate = { ...args };
    if (args.date) fieldsToUpdate.date = new Date(args.date);
    const updatedOrder = await Order.findByIdAndUpdate(args.id, fieldsToUpdate, { new: true });
    return updatedOrder;
  },
};

export const deleteOrder = {
  type: OrderType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    checkAuthorization(context.req);
    const order = Order.findById(args.id);
    if (!order) throw new Error("Order with that ID not found!");
    const deletedOrder = Order.findByIdAndRemove(args.id);
    return deletedOrder;
  },
};

export const getOrder = {
  type: OrderType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent: any, args: any) => {
    const order = await Order.findById(args.id);
    if (!order) throw new Error("Order with given ID not found");
    if (!order.isPaid) {
      const isPaid = await isOrderPaidViaStripe(order);
      if (isPaid) {
        order.isPaid = true;
        order.save();
      }
    }
    return order;
  },
};

export const getOrders = {
  type: OrdersResponseType,
  args: {
    page: { type: GraphQLInt },
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    surname: { type: GraphQLString },
    email: { type: GraphQLString },
    date: { type: GraphQLString },
    phone: { type: GraphQLString },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    const { req, res } = context;
    checkAuthorization(req);
    const page = args.page || 1;
    const filter = getFilter(args);

    const orders = await Order.find(filter)
      .limit(RESULT_PER_PAGE)
      .skip((page - 1) * RESULT_PER_PAGE)
      .sort("-date");

    const count = await Order.countDocuments(filter);
    if (!orders || !orders.length) throw new Error("No orders found!");
    return { orders, count, page, allPages: Math.ceil(count / RESULT_PER_PAGE) };
  },
};

const generateHTMLStringForOrder = (order: OrderDoc) => {
  const priceWithoutCoupon =
    order.dishes.reduce<number>((acc, dish) => (acc += dish.price * dish.quantity), 0) + DELIVERY_PRICE;
  const finalPrice = (Math.round(priceWithoutCoupon * 100) / 100).toFixed(2);
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
      <h3>Delivery: ${DELIVERY_PRICE} zł</h3>
      ${
        order.couponAppliedPercentage
          ? `<h3 'style="color: #888"'>Summary: ${priceWithoutCoupon} zł</h3>`
          : ""
      }
      ${!order.couponAppliedPercentage ? `<h3>Summary: ${priceWithoutCoupon} zł</h3>` : ""}
      ${
        order.couponAppliedPercentage
          ? `<h3>Coupon Applied: ${order.couponAppliedPercentage}%</h3>
             <h3>Final price: ${finalPrice}</h3>`
          : ""
      }
    </body>
  </html>`;
};
