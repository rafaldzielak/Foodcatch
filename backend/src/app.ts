import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { rootSchema } from "./schema/rootSchema";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";

export type Context = { req: Request; res: Response };

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI!, () => console.log("Mongo connected"));

app.use(cors());

const PORT = 5000;

app.use(cookieParser());
app.use((req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next();
  } else {
    const data = verify(token, process.env.JWT_SECRET!) as any;
    (req as any).email = data.email;
    (req as any).jwt = token;
    next();
  }
});

app.use("/graphql", (req: Request, res: Response) =>
  graphqlHTTP({ schema: rootSchema, graphiql: true, context: { req, res } })(req, res)
);

app.listen(PORT, () => {
  console.log("Listening on: " + PORT);
});
