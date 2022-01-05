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
import { Dish } from "../models/dish";

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
    quantity: { type: GraphQLInt },
    id: { type: GraphQLString },
    description: { type: new GraphQLNonNull(GraphQLString) },
    isVege: { type: new GraphQLNonNull(GraphQLBoolean) },
    isSpicy: { type: new GraphQLNonNull(GraphQLBoolean) },
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
    type: { type: GraphQLString },
  },
  resolve: async (parent: any, args: any) => {
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
