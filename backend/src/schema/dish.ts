import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLScalarType,
  GraphQLError,
} from "graphql";
import { Context } from "../app";
import { Dish } from "../models/dish";
import { checkAuthorization, storeFS } from "./utils";
import { GraphQLUpload } from "graphql-upload-minimal";

const Upload = new GraphQLScalarType({
  name: "Upload2",
  description: "The `Upload` scalar type represents a file upload.",
  parseValue(value) {
    return value;
  },
  parseLiteral(ast) {
    throw new GraphQLError("Upload literal unsupported.", ast);
  },
  serialize() {
    throw new GraphQLError("Upload serialization unsupported.");
  },
});

export const DishType = new GraphQLObjectType({
  name: "Dish",
  fields: () => ({
    name: { type: GraphQLString },
    imgURL: { type: GraphQLString },
    localImgURL: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    id: { type: GraphQLString },
    description: { type: GraphQLString },
    isVege: { type: GraphQLBoolean },
    isSpicy: { type: GraphQLBoolean },
    isNew: { type: GraphQLBoolean },
    isBestseller: { type: GraphQLBoolean },
    type: { type: GraphQLString },
  }),
});

export const DishInputType = new GraphQLInputObjectType({
  name: "DishInput",
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    imgURL: { type: GraphQLString },
    localImgURL: { type: GraphQLString },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    quantity: { type: GraphQLInt },
    id: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    isVege: { type: new GraphQLNonNull(GraphQLBoolean) },
    isSpicy: { type: new GraphQLNonNull(GraphQLBoolean) },
    isNew: { type: new GraphQLNonNull(GraphQLBoolean) },
    isBestseller: { type: new GraphQLNonNull(GraphQLBoolean) },
    type: { type: GraphQLString },
  }),
});

export const createDish = {
  type: DishType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    imgURL: { type: GraphQLString },
    localImgURL: { type: GraphQLString },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    quantity: { type: GraphQLInt },
    id: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    isVege: { type: new GraphQLNonNull(GraphQLBoolean) },
    isSpicy: { type: new GraphQLNonNull(GraphQLBoolean) },
    isNew: { type: new GraphQLNonNull(GraphQLBoolean) },
    isBestseller: { type: new GraphQLNonNull(GraphQLBoolean) },
    type: { type: GraphQLString },
    image: { description: "Image file.", type: Upload },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    // checkAuthorization(context.req);
    const img = args.image;
    console.log(img);
    // console.log(args.image);
    if (args.image) args.localImgURL = await storeFS(img.file);
    console.log("AFET STORE");
    const dish = Dish.build(args);
    console.log(dish);
    await dish.save();
    return dish;
  },
};

export const getDishes = {
  type: new GraphQLList(DishType),
  resolve: async () => {
    const dishes = await Dish.find({});
    return dishes;
  },
};

export const getDish = {
  type: DishType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parents: any, args: any) => {
    const dish = await Dish.findById(args.id);
    if (!dish) throw new Error("Dish with given ID not found!");
    return dish;
  },
};

export const editDish = {
  type: DishType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    imgURL: { type: GraphQLString },
    localImgURL: { type: GraphQLString },
    price: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
    description: { type: GraphQLString },
    isVege: { type: GraphQLBoolean },
    isSpicy: { type: GraphQLBoolean },
    isNew: { type: new GraphQLNonNull(GraphQLBoolean) },
    isBestseller: { type: new GraphQLNonNull(GraphQLBoolean) },
    type: { type: GraphQLString },
  },
  resolve: async (parents: any, args: any, context: Context) => {
    checkAuthorization(context.req);
    const dish = await Dish.findByIdAndUpdate(args.id, args, { new: true });
    console.log(dish);
    if (!dish) throw new Error("Dish with given ID not found!");
    return dish;
  },
};

export const deleteDish = {
  type: DishType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parents: any, args: any, context: Context) => {
    checkAuthorization(context.req);
    const dish = await Dish.findById(args.id);
    if (!dish) throw new Error("Dish with given ID not found!");
    await dish.remove();
    return dish;
  },
};
