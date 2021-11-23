import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLNonNull } from "graphql";

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
  resolve: (parent: any, args: any) => {
    return { ...args };
  },
};
