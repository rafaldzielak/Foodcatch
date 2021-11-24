import express from "express";
import { graphqlHTTP } from "express-graphql";
import { bookingSchema } from "./schema/rootSchema";
import cors from "cors";

const app = express();

app.use(cors());

const PORT = 5000;

app.use("/graphql", graphqlHTTP({ schema: bookingSchema, graphiql: true }));

app.listen(PORT, () => {
  console.log("Listening on: " + PORT);
});
