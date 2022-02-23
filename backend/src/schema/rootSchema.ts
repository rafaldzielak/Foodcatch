import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createBooking, getBooking, getBookings } from "./booking";
import { createOrder, getOrder, getOrders, useCoupon, editOrder } from "./order";
import { createDish, getDishes, getDish, deleteDish, editDish } from "./dish";
import { createUser, loginUser, getUser } from "./user";
import { createCoupon, getCoupons, editCoupon } from "./coupon";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getBooking,
    getBookings,
    getCoupons,
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
    editOrder,
    createDish,
    editDish,
    deleteDish,
    createUser,
    loginUser,
    createCoupon,
    editCoupon,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export { schema as rootSchema };
