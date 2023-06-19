const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());

app.use(cors());

const Product = require("./models/productModel");
const Users = require("./models/userModel");
const Cart = require("./models/cartModel");

const port = process.env.PORT || 3000;

//add users
app.post("/users", async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//add product to carts
app.post("/carts", async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = { id: id };
    const product = await Product.find(data);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

//update products
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    //cant find any products in database
    if (!product) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete product
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findByIdAndDelete(id);
    if (!products) {
      return res
        .status(400)
        .json({ message: `can't find any product with ID ${id}` });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:12345admin@cluster0.avq7kyp.mongodb.net/Thaibev?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to Mongo");
    app.listen(port, () => {
      console.log(`Node running on ${port}`);
    });
  })
  .catch(() => {
    console.log("error connect to Mongo");
  });
//module.exports = router;
