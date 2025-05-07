const Product = require("../Model/product.model");

exports.getIndex = (req, res, next) => {
  Product.find()
    .populate("userId")
    .then((products) => {
      res.send(products);
    });
};

exports.postProduct = (req, res, next) => {
  const { title, price, imageUrl, description, userId } = req.body;
  if (!title || !price || !imageUrl || !description || !userId) {
    res.status(400).send({
      message: "bad request",
    });
  } else {
    const product = new Product({
      title,
      price,
      imageUrl,
      description,
      userId,
    });
    product
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).send({
          message: "product created!",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: err._message,
        });
      });
  }
};

exports.editProduct = (req, res, next) => {
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;

  Product.findById(req.body.productId).then((product) => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDescription;

    product
      .save()
      .then(() => {
        console.log("product edited successfully");
        res.status(200).send({
          message: "product edited successfully.",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByIdAndDelete({ _id: prodId })
    .then(() => {
      console.log("Product Deleted Successfully");
      res.status(200).send({
        message: "Product Deleted",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
