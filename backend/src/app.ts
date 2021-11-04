import express from "express";
import { orderRouter } from "./routes/OrderRouter";

const app = express();

const PORT = 5000;

app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  console.log("Listening on: " + PORT);
});
