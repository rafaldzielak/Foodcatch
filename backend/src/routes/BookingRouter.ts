import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  console.log("Booking post");
  res.send({ success: true });
});

export { router as bookingRouter };
