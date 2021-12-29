import mongoose from "mongoose";

export type DishType = "Appetizers" | "Soups" | "Main Dishes" | "Desserts";

export interface DishAttrs {
  price: number;
  name: string;
  description: string;
  isVege: boolean;
  isSpicy: boolean;
  imgURL?: string;
  type: DishType;
}

export interface DishSelectAttrs extends DishAttrs {
  id: string;
  quantity: number;
}

interface DishModel extends mongoose.Model<DishDoc> {
  build(attrs: DishDoc): DishDoc;
}

export interface DishDoc extends mongoose.Document {
  price: number;
  name: string;
  description: string;
  isVege: boolean;
  isSpicy: boolean;
  imgURL?: string;
  type: DishType;
}

const dishSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  isVege: { type: Boolean, required: true },
  isSpicy: { type: Boolean, required: true },
  imgURL: { type: String },
});

dishSchema.statics.build = (attrs: DishAttrs) => {
  return new Dish(attrs);
};

const Dish = mongoose.model<DishDoc, DishModel>("Dish", dishSchema);
