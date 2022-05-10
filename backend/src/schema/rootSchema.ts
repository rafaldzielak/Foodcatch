import { GraphQLObjectType, GraphQLSchema, GraphQLBoolean } from "graphql";
import { createBooking, getBooking, getBookings } from "./booking";
import { createOrder, getOrder, getOrders, editOrder, deleteOrder } from "./order";
import { createDish, getDishes, getDish, deleteDish, editDish } from "./dish";
import { createUser, loginUser, getUser } from "./user";
import { createCoupon, getCoupons, editCoupon, removeCoupon, useCoupon } from "./coupon";
import fs from "fs";
import { GraphQLUpload } from "graphql-upload-minimal";

const storeFS = ({ stream, filename }: any) => {
  const uploadDir = "src/images";
  const extension = filename.split(".").pop();
  const path = `${uploadDir}/${Date.now()}.${extension}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", (error: any) => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on("error", (error: any) => reject(error))
      .on("finish", () => resolve({ path }))
  );
};

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
    const { filename, mimetype, createReadStream } = await args.image;
    const stream = createReadStream();
    console.log(filename);
    console.log(mimetype);
    const pathObj = await storeFS({ stream, filename });
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
    deleteOrder,
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
