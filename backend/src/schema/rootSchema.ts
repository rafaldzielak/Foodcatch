import { GraphQLObjectType, GraphQLSchema, GraphQLBoolean } from "graphql";
import { createBooking, getBooking, getBookings } from "./booking";
import { createOrder, getOrder, getOrders, editOrder } from "./order";
import { createDish, getDishes, getDish, deleteDish, editDish } from "./dish";
import { createUser, loginUser, getUser } from "./user";
import { createCoupon, getCoupons, editCoupon, removeCoupon, useCoupon } from "./coupon";
import { GraphQLUpload } from "graphql-upload-minimal";
import { storeFS } from "./utils";

const uploadMutation = {
  type: GraphQLBoolean,
  description: "Uploads an image.",
  args: {
    image: {
      description: "Image file.",
      type: GraphQLUpload,
    },
  },
  async resolve(parent: any, args: any) {
    const pathObj = await storeFS(args.image);
    console.log(pathObj);
    return true;
  },
};

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
    uploadMutation,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export { schema as rootSchema };
