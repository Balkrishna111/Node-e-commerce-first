require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", "View");
app.use(express.json());

const shopRoutes = require("./Routes/shop.route");
const adminRoutes = require("./Routes/admin.route");
const cartRoutes = require("./Routes/cart.route");

app.use(shopRoutes);
app.use(adminRoutes);
app.use("/cart", cartRoutes);

mongoose
  .connect(
    "mongodb+srv://sandeshgautam0000:asdfasdf1@cluster0.bxdtdbt.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(process.env.BASE_URL);
    console.log(`App started at port: ${process.env.BASE_URL}`);
    console.log("Database Connected!!!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Couldn't Start App.");
  });
