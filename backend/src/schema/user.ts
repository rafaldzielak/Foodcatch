import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";
import { User } from "../models/user";
import { sign } from "jsonwebtoken";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    email: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
  }),
});

export const createUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent: any, args: any) => {
    const user = await User.build(args);
    console.log(user);
    return user;
  },
};
