import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { createBooking, getBooking, getBookings } from "./booking";
import { createOrder, getOrder, getOrders, editOrder } from "./order";
import { createDish, getDishes, getDish, deleteDish, editDish } from "./dish";
import { createUser, loginUser, getUser } from "./user";
import { createCoupon, getCoupons, editCoupon, removeCoupon, useCoupon } from "./coupon";

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
    removeCoupon,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export { schema as rootSchema };
