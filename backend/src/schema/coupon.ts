import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
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

export const DishInputType = new GraphQLInputObjectType({
  name: "CouponInput",
  fields: () => couponGraphQL,
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
