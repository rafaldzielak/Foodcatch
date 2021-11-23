import { GraphQLObjectType, GraphQLID, GraphQLSchema } from "graphql";
import { BookType, createBooking } from "./booking";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    booking: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return "BookQuery";
      },
    },
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
