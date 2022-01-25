import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";
import { User } from "../models/user";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Context } from "../app";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    email: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
    jwt: { type: GraphQLString },
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

export const loginUser = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (parent: any, args: any, context: Context) => {
    const { email, password } = args;
    const { req, res } = context;

    const user = await User.findOne({ email }).populate("password");
    if (!user) throw new Error("Invalid credentials!");
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new Error("Invalid credentials!");
    const jwt = sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "30d",
    });
    res.cookie("jwt", jwt);
    return { email: user.email, isAdmin: user.isAdmin, jwt };
  },
};
