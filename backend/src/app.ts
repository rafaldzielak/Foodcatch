import express from "express";
import { bookingRouter } from "./routes/BookingRouter";
import { orderRouter } from "./routes/OrderRouter";
import { graphqlHTTP } from "express-graphql";
import { bookingSchema } from "./schema/rootSchema";

const app = express();

const PORT = 5000;

app.use("/graphql", graphqlHTTP({ schema: bookingSchema, graphiql: true }));

app.listen(PORT, () => {
  console.log("Listening on: " + PORT);
});
