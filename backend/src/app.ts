import express from "express";
import { graphqlHTTP } from "express-graphql";
import { bookingSchema } from "./schema/rootSchema";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI!, () => console.log("Mongo connected"));

app.use(cors());

const PORT = 5000;

app.use("/graphql", graphqlHTTP({ schema: bookingSchema, graphiql: true }));

app.listen(PORT, () => {
  console.log("Listening on: " + PORT);
});
