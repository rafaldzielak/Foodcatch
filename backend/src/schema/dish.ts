import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
import { Context } from "../app";
import { Dish } from "../models/dish";
import { checkAuthorization } from "./utils";

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
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    quantity: { type: GraphQLInt },
    id: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    isVege: { type: new GraphQLNonNull(GraphQLBoolean) },
    isSpicy: { type: new GraphQLNonNull(GraphQLBoolean) },
    isNew: { type: new GraphQLNonNull(GraphQLBoolean) },
    isBestseller: { type: new GraphQLNonNull(GraphQLBoolean) },
    type: { type: GraphQLString },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    checkAuthorization(context.req);
    const dish = Dish.build({ ...args });
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
