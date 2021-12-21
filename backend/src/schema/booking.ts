import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";
import { Booking, BookingAttrs } from "../models/booking";

export const BookType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    id: { type: GraphQLID },
    people: { type: GraphQLInt },
    phone: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    date: { type: GraphQLString },
    readableId: { type: GraphQLString },
  }),
});

export const createBooking = {
  type: BookType,
  args: {
    people: { type: new GraphQLNonNull(GraphQLInt) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent: any, args: any) => {
    const date = new Date(args.date);
    const alreadyBooked = await Booking.count({ date });
    if (alreadyBooked >= 2)
      throw new Error("There are no available tables at that time. Please try with a different one.");
    const booking = await Booking.build({ ...args, date });
    await booking.save();
    return booking;
  },
};

export const getBooking = {
  type: BookType,
  args: {
    readableId: { type: GraphQLString },
    id: { type: GraphQLString },
  },
  resolve: async (parent: any, args: any) => {
    const { id, readableId } = args;
    if (!id && !readableId) throw new Error("No booking found!");
    let booking: BookingAttrs | null;
    if (id) booking = await Booking.findById(id);
    else booking = await Booking.findOne({ readableId: readableId });
    if (!booking) throw new Error("No booking with given ID");
    return booking;
  },
};
