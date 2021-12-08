import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLFloat,
} from "graphql";
import { Order, OrderAttrs } from "../models/order";

export const DishType = new GraphQLObjectType({
  name: "Dish",
  fields: () => ({
    name: { type: GraphQLString },
    img: { type: GraphQLString },
    price: { type: GraphQLInt },
  }),
});
export const DishInputType = new GraphQLInputObjectType({
  name: "DishInput",
  fields: () => ({
    name: { type: GraphQLString },
    img: { type: GraphQLString },
    price: { type: GraphQLFloat },
    amount: { type: GraphQLInt },
  }),
});

export const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLString },
    phone: { type: GraphQLString },
    dish: { type: DishType },
    firstName: { type: GraphQLString },
    surname: { type: GraphQLString },
    street: { type: GraphQLString },
    streetNumber: { type: GraphQLString },
    city: { type: GraphQLString },
    paymentMethod: { type: GraphQLString },
  }),
});

export const createOrder = {
  type: OrderType,
  args: {
    date: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    dish: { type: DishInputType },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    surname: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    streetNumber: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    paymentMethod: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent: any, args: any) => {
    const date = new Date(args.date);
    const order = Order.build({ ...args, date });
    console.log(order);
    await order.save();
    return order;
  },
};
