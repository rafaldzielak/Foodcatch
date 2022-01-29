import { GraphQLObjectType, GraphQLID, GraphQLSchema } from "graphql";
import { createBooking, getBooking } from "./booking";
import { createOrder, getOrder, getOrders, useCoupon } from "./order";
import { createDish, getDishes, getDish, deleteDish, editDish } from "./dish";
import { createUser, loginUser, getUser } from "./user";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getBooking,
    getOrder,
    getOrders,
    useCoupon,
    getDishes,
    getDish,
    getUser,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createBooking,
    createOrder,
    createDish,
    editDish,
    deleteDish,
    createUser,
    loginUser,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export { schema as rootSchema };
