import mongoose, { Schema } from "mongoose";
import { DishAttrs } from "./Dish";

interface DishWithNumber extends DishAttrs {
  amount: number;
}

export interface OrderAttrs {
  date: Date;
  phone: string;
  dish: DishWithNumber;
  firstName: string;
  surname: string;
  street: string;
  streetNumber: string;
  city: string;
  paymentMethod: "cash" | "card";
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
  date: Date;
  phone: string;
  dish: DishWithNumber;
  firstName: string;
  surname: string;
  street: string;
  streetNumber: string;
  city: string;
  paymentMethod: "cash" | "card";
}

const orderSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  phone: { type: String, required: true },
  dish: { type: Schema.Types.Mixed },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  street: { type: String, required: true },
  streetNumber: { type: String, required: true },
  city: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order({ ...attrs });
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export { Order };
