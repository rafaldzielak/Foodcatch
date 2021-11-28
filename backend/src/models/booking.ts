import mongoose from "mongoose";

interface BookingAttrs {
  name: string;
  date: string;
  people: number;
  phone: string;
}

interface BookingModel extends mongoose.Model<BookingDoc> {
  build(attrs: BookingAttrs): BookingDoc;
}

interface BookingDoc extends mongoose.Document {
  name: string;
  date: string;
  people: number;
  phone: string;
}

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  people: { type: Number, required: true },
  phone: { type: String, required: true },
});

bookingSchema.statics.build = (attrs: BookingAttrs) => {
  return new Booking(attrs);
};

const Booking = mongoose.model<BookingDoc, BookingModel>("Booking", bookingSchema);
