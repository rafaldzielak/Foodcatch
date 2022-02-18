import mongoose from "mongoose";

export interface CouponAttrs {
  couponName: string;
  validUntil: Date;
  percentage: number;
}
interface Coupon extends mongoose.Model<CouponDoc> {
  build(attrs: CouponDoc): CouponDoc;
}

export interface CouponDoc extends mongoose.Document {
  couponName: string;
  validUntil: Date;
  percentage: number;
}

const couponSchema = new mongoose.Schema({
  couponName: { type: String, required: true },
  validUntil: { type: Date, required: true },
  percentage: { type: Number, required: true },
});

couponSchema.statics.build = (attrs: CouponAttrs) => {
  return new Coupon(attrs);
};

export const Coupon = mongoose.model<CouponDoc, Coupon>("Coupon", couponSchema);
