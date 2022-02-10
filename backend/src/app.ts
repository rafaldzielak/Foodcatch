import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { rootSchema } from "./schema/rootSchema";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./models/user";

export type Context = { req: Request; res: Response };

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI!, () => console.log("Mongo connected"));

app.use(cors());

const PORT = 5000;

app.use(cookieParser());
app.use(async (req, res, next) => {
  let jwt = req.get("Authorization");
  if (jwt) jwt = jwt.replace("Bearer ", "");
  if (!jwt) {
    next();
  } else {
    const data = verify(jwt, process.env.JWT_SECRET!) as any;
    const user = await User.findOne({ email: data.email });
    (req as any).isAdmin = user?.isAdmin;
    (req as any).email = user?.email;
    (req as any).jwt = jwt;
    next();
  }
});

app.use("/graphql", (req: Request, res: Response) =>
  graphqlHTTP({ schema: rootSchema, graphiql: true, context: { req, res } })(req, res)
);

app.listen(PORT, () => {
  console.log("Listening on: " + PORT);
});
