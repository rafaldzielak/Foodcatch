import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { Context } from "../app";
import { Coupon } from "../models/coupon";
import { checkAuthorization } from "./utils";
import stripe from "../utils/stripe";

const couponGraphQL = {
  couponName: { type: GraphQLString },
  validUntil: { type: GraphQLString },
  percentage: { type: GraphQLInt },
};

export const CouponType = new GraphQLObjectType({
  name: "Coupon",
  fields: () => couponGraphQL,
});

const CouponResponseType = new GraphQLObjectType({
  name: "Coupons",
  fields: () => ({
    coupons: { type: new GraphQLList(CouponType) },
    count: { type: GraphQLInt },
    page: { type: GraphQLInt },
    allPages: { type: GraphQLInt },
  }),
});

export const createCoupon = {
  type: CouponType,
  args: {
    couponName: { type: new GraphQLNonNull(GraphQLString) },
    validUntil: { type: new GraphQLNonNull(GraphQLString) },
    percentage: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    checkAuthorization(context.req);
    const existingCoupon = await Coupon.findOne({ couponName: args.couponName });
    if (existingCoupon) throw new Error("Coupon with that name already exists!");
    const validUntil = new Date(args.validUntil);

    const stripeCoupon = await stripe.coupons.create({
      duration: "forever",
      id: args.couponName,
      percent_off: args.percentage,
    });

    console.log(stripeCoupon);
    const coupon = Coupon.build({ ...args, validUntil });
    await coupon.save();
    return coupon;
  },
};

export const editCoupon = {
  type: CouponType,
  args: {
    couponName: { type: new GraphQLNonNull(GraphQLString) },
    validUntil: { type: GraphQLString },
    percentage: { type: GraphQLInt },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    checkAuthorization(context.req);
    const { couponName } = args;
    const existingCoupon = await Coupon.findOne({ couponName: args.couponName });
    if (!existingCoupon) throw new Error("No coupon with that name found!");
    await stripe.coupons.del(args.couponName);
    const stripeCoupon = await stripe.coupons.create({
      duration: "forever",
      id: args.couponName,
      percent_off: args.percentage,
    });
    console.log(args.percentage);
    const updatedCoupon = await Coupon.findOneAndUpdate({ couponName }, { ...args }, { new: true });
    return updatedCoupon;
  },
};

export const removeCoupon = {
  type: CouponType,
  args: {
    couponName: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    checkAuthorization(context.req);
    const { couponName } = args;
    const existingCoupon = await Coupon.findOne({ couponName: args.couponName });
    if (!existingCoupon) throw new Error("No coupon with that name found!");
    await stripe.coupons.del(args.couponName);
    const removedCoupon = await Coupon.findOneAndDelete({ couponName });
    return removedCoupon;
  },
};

export const getCoupons = {
  type: CouponResponseType,
  args: {},
  resolve: async (parent: any, args: any, context: Context) => {
    checkAuthorization(context.req);
    const coupons = await Coupon.find();
    const count = await Coupon.count();
    return { coupons, count };
  },
};

export const useCoupon = {
  type: CouponType,
  args: {
    couponApplied: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent: any, args: any) => {
    console.log("args");
    console.log(args);
    const coupon = await getCouponUtil(args.couponApplied);
    return coupon;
  },
};

export const getCouponUtil = async (couponName: string) => {
  const coupon = await Coupon.findOne({ couponName });
  if (!coupon) throw new Error("Invalid coupon");
  if (coupon.validUntil.getTime() < new Date().getTime()) throw new Error("Coupon expired!");
  return coupon;
};
