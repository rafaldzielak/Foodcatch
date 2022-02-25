import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
} from "graphql";
import { Context } from "../app";
import { Coupon } from "../models/coupon";
import { checkAuthorization } from "./utils";

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
    const updatedCoupon = await Coupon.findOneAndUpdate({ couponName }, { ...args }, { new: true });
    console.log(updatedCoupon);
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
