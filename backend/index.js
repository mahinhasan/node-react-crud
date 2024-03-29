const express = require("express");
const cors = require("cors");
// call conections string

require("./db/config");
const app = express();

const User = require("./db/Users");
const Product = require("./db/Product");

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let res = user.save();
  resp.send(res);
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      resp.send(user);
    } else {
    }
  } else {
    resp.send({ user: "No user found" });
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let res = await product.save();
  resp.send(res);
});

app.get("/products", async (req, resp) => {
  const products = await Product.find();
  resp.json(products);
});

app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      console.log("Not deleted");
    }
    res.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
});



app.put("/update/:id", async (req, resp) => {
  try {
    const productId = req.params.id;
    const updateData = req.body; // Data to update

    // Find the product by ID and update it
    const result = await Product.findOneAndUpdate({ _id: productId }, updateData, { new: true });

    if (result) {
      resp.json(result); // Send updated product data as response
    } else {
      resp.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    resp.status(500).json({ error: "Failed to update product data" });
  }
});




// app listing
app.listen(5000);
