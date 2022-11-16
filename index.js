const express = require("express");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/adminRoutes");
const bookMarkRoute = require("./routes/bookmark");
const exerciseRoute = require("./routes/exerciseRoutes");
const userRoute = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);
app.use("/exercises", exerciseRoute);
app.use("/bookmark", bookMarkRoute);
app.use("/admin", adminRoutes);
app.get("/", (req, res) => {
  console.log("Homepage routing");
  res.send("Hello from the homepage");
});
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_SECRET)
  .then(() => {
    console.log("connection Successfull with database");
    app.listen(PORT, () => {
      console.log("Sever is running on PORT", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
