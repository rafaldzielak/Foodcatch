import mongoose from "mongoose";

export interface BookingAttrs {
  name: string;
  date: Date;
  people: number;
  phone: string;
}

interface BookingModel extends mongoose.Model<BookingDoc> {
  build(attrs: BookingAttrs): BookingDoc;
}

interface BookingDoc extends mongoose.Document {
  name: string;
  date: Date;
  people: number;
  phone: string;
}

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  people: { type: Number, required: true },
  phone: { type: String, required: true },
});

bookingSchema.statics.build = (attrs: BookingAttrs) => {
  return new Booking(attrs);
};

const Booking = mongoose.model<BookingDoc, BookingModel>("Booking", bookingSchema);

export { Booking };
