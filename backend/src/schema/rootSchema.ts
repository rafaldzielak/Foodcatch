import { GraphQLObjectType, GraphQLID, GraphQLSchema } from "graphql";
import { createBooking, getBooking } from "./booking";
import { createOrder, getOrder, useCoupon } from "./order";
import { createDish, getDishes } from "./dish";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getBooking,
    getOrder,
    useCoupon,
    getDishes,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createBooking,
    createOrder,
    createDish,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export { schema as rootSchema };
