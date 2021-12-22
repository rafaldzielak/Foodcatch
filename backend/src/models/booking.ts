import mongoose from "mongoose";

export interface BookingAttrs {
  name: string;
  date: Date;
  people: number;
  phone: string;
  email: string;
}

interface BookingModel extends mongoose.Model<BookingDoc> {
  build(attrs: BookingAttrs): BookingDoc;
}

export interface BookingDoc extends mongoose.Document {
  name: string;
  date: Date;
  people: number;
  phone: string;
  email: string;
  readableId: string;
}

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  people: { type: Number, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  readableId: { type: String },
});

bookingSchema.statics.build = async (attrs: BookingAttrs) => {
  const { date, name, phone } = attrs;
  let readableId = `${name.substr(0, 3).toLocaleLowerCase()}${phone.substr(-3)}d${date
    .getFullYear()
    .toString()
    .substr(-2)}${date.getMonth()}${date.getDay()}`;
  let existingBooking = await Booking.findOne({ readableId });
  if (existingBooking) {
    readableId += `h${date.getHours()}${date.getMinutes()}`;
  }
  return new Booking({ ...attrs, readableId });
};

const Booking = mongoose.model<BookingDoc, BookingModel>("Booking", bookingSchema);

export { Booking };
