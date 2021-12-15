import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import { Order, OrderAttrs } from "../models/order";

const coupons = [{ couponName: "test20", discount: 20 }];

export const DishType = new GraphQLObjectType({
  name: "Dish",
  fields: () => ({
    name: { type: GraphQLString },
    imgURL: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    id: { type: GraphQLString },
    description: { type: GraphQLString },
    isVege: { type: GraphQLBoolean },
    isSpicy: { type: GraphQLBoolean },
    type: { type: GraphQLString },
  }),
});
export const DishInputType = new GraphQLInputObjectType({
  name: "DishInput",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    imgURL: { type: GraphQLString },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
    id: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    isVege: { type: new GraphQLNonNull(GraphQLBoolean) },
    isSpicy: { type: new GraphQLNonNull(GraphQLBoolean) },
    type: { type: GraphQLString },
  }),
});

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
    city: { type: GraphQLString },
    paymentMethod: { type: GraphQLString },
    couponAppliedPercentage: { type: GraphQLInt },
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
