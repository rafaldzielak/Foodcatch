import { GraphQLObjectType, GraphQLID, GraphQLSchema } from "graphql";
import { BookType, createBooking, getBooking } from "./booking";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getBooking,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createBooking,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export { schema as bookingSchema };
