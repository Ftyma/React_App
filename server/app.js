const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const usersRouter = require("./routes/users");
const cartsRouter = require("./routes/carts");
const productsRouter = require("./routes/products");

app.use("/users", usersRouter);
app.use("/carts", cartsRouter);
app.use("/products", productsRouter);

const port = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://admin:admin12345@cluster0.avq7kyp.mongodb.net/Thaibev?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to Mongo");
    app.listen(port, () => {
      console.log(`Node running on ${port}`);
    });
  })
  .catch((error) => {
    console.log("error connect to Mongo", error);
  });
