import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";
import { Booking, BookingAttrs } from "../models/booking";

export const BookType = new GraphQLObjectType({
  name: "Booking",
  fields: () => ({
    id: { type: GraphQLID },
    people: { type: GraphQLInt },
    phone: { type: GraphQLString },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

export const createBooking = {
  type: BookType,
  args: {
    people: { type: new GraphQLNonNull(GraphQLInt) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent: any, args: any) => {
    const date = new Date(Number(args.date));
    const alreadyBooked = await Booking.count({ date });
    if (alreadyBooked >= 2) throw new Error("Error - no tables available");
    const booking = Booking.build({ ...args, date });
    await booking.save();
    return args;
  },
};
