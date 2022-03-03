import mongoose, { Schema } from "mongoose";
import { DishSelectAttrs } from "./dish";

export interface OrderAttrs {
  date: Date;
  phone: string;
  dishes: [DishSelectAttrs];
  firstName: string;
  surname: string;
  street: string;
  streetNumber: string;
  email: string;
  city: string;
  paymentMethod: "cash" | "card";
  couponAppliedPercentage: number;
  orderPaymentId: string;
  orderPaymentProvider: "stripe" | "paypal";
  isPaid: boolean;
  isDelivered: boolean;
  notes: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

export interface OrderDoc extends mongoose.Document {
  date: Date;
  phone: string;
  dishes: [DishSelectAttrs];
  firstName: string;
  surname: string;
  street: string;
  streetNumber: string;
  email: string;
  city: string;
  paymentMethod: "cash" | "card";
  paymentUrl: string;
  couponAppliedPercentage: number;
  orderPaymentId: string;
  orderPaymentProvider: "stripe" | "paypal";
  isPaid: boolean;
  isDelivered: boolean;
  notes: string;
}

const orderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  phone: { type: String, required: true },
  dishes: { type: [Schema.Types.Mixed] },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  street: { type: String, required: true },
  streetNumber: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  paymentUrl: { type: String },
  couponAppliedPercentage: { type: Number },
  orderPaymentId: { type: String },
  orderPaymentProvider: { type: String },
  isPaid: { type: Boolean },
  isDelivered: { type: Boolean },
  notes: { type: String },
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({ ...attrs });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
