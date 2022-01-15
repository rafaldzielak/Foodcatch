import { GraphQLObjectType, GraphQLID, GraphQLSchema } from "graphql";
import { createBooking, getBooking } from "./booking";
import { createOrder, getOrder, useCoupon } from "./order";
import { createDish, getDishes, getDish, deleteDish } from "./dish";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getBooking,
    getOrder,
    useCoupon,
    getDishes,
    getDish,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createBooking,
    createOrder,
    createDish,
    deleteDish,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export { schema as rootSchema };
