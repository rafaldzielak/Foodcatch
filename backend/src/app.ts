import express, { Request, Response } from "express";
import { graphqlHTTP } from "express-graphql";
import { rootSchema } from "./schema/rootSchema";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./models/user";
import { graphqlUploadExpress } from "graphql-upload-minimal";

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
    try {
      const data = verify(jwt, process.env.JWT_SECRET!) as any;
      const user = await User.findOne({ email: data.email });
      (req as any).isAdmin = user?.isAdmin;
      (req as any).email = user?.email;
      (req as any).jwt = jwt;
    } catch (error) {
      console.log(error);
    }
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFieldSize: 100000000, maxFileSize: 100000 }),
  (req: Request, res: Response) =>
    graphqlHTTP({ schema: rootSchema, graphiql: true, context: { req, res } })(req, res)
);

app.listen(PORT, () => {
  console.log("Listening on: " + PORT);
});
