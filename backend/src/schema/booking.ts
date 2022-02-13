import { format } from "date-fns";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import { Context } from "../app";
import { Booking, BookingAttrs, BookingDoc } from "../models/booking";
import { DateFilter, RegexFilter } from "../utils/filterDB";
import sendEmail from "../utils/sendMail/sendMail";
import { RESULT_PER_PAGE } from "./consts";
import { checkAuthorization, getFilter } from "./utils";

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

const OrdersResponseType = new GraphQLObjectType({
  name: "Bookings",
  fields: () => ({
    bookings: { type: new GraphQLList(BookType) },
    count: { type: GraphQLInt },
    page: { type: GraphQLInt },
    allPages: { type: GraphQLInt },
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
    sendEmail(booking.email, "FoodCatch: Booking confirmed!", generateHTMLStringForBooking(booking));
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

export const getBookings = {
  type: OrdersResponseType,
  args: {
    page: { type: GraphQLInt },
    people: { type: GraphQLInt },
    id: { type: GraphQLString },
    readableId: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    date: { type: GraphQLString },
    phone: { type: GraphQLString },
    getPast: { type: GraphQLBoolean },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    const { req, res } = context;
    checkAuthorization(req);
    const { page = 1, getPast } = args;
    const filter = getFilter(args);
    if (getPast) filter.date = { $lte: new Date() };
    else filter.date = { $gte: new Date() };
    const bookings = await Booking.find(filter)
      .limit(RESULT_PER_PAGE)
      .skip((page - 1) * RESULT_PER_PAGE)
      .sort(getPast ? "-date" : "date");

    const count = await Booking.countDocuments(filter);
    if (!bookings?.length) throw new Error("No bookings found!");
    return { bookings, count, page, allPages: Math.ceil(count / RESULT_PER_PAGE) };
  },
};

const generateHTMLStringForBooking = (booking: BookingDoc) => {
  return /*html*/ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Booking Confirmed</title>
      <style>
        * {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <h1> Hello ${booking.name}, your booking is confirmed! </h1>
      <h2>For more details <a href='${process.env.SITE_URL}/book/${booking.readableId}'>Click here</a></h2>
      <h2> Booking: </h2>
      <div className='booking-details-wrapper'>
      <div>
        <h2 className='confirm'>Your booking is comfirmed!</h2>
      </div>
      <div className='booking-details'>
        <div className='name'>
          <h2 className='grey' style='color: #666;'>Name:</h2>
          <h2>${booking.name}</h2>
        </div>
        <div className='name'>
          <h2 className='grey' style='color: #666;'>People:</h2>
          <h2>${booking.people}</h2>
        </div>
        <div className='email'>
          <h2 className='grey' style='color: #666;'>Email:</h2>
          <h2>${booking.email}</h2>
        </div>
        <div className='date'>
          <h2 className='grey' style='color: #666;'>Date:</h2>
          <h2>${format(new Date(Number(booking.date!)), "EEEE, do MMMM Y - H:mm")}</h2>
        </div>
      </div>
    </div>
    </body>
  </html>`;
};
