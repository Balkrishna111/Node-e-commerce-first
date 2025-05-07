const Cart = require("../Model/cart.model");

exports.getCart = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(400).send({
      message: "Bad Request",
    });
  } else {
    await Cart.findOne({ user: userId })
      .populate("user items.product")
      .then((userCart) => {
        console.log("foundcart: ", userCart);

        res.status(200).send(userCart);
      })
      .catch((err) => {
        res.status(500).send({
          message: err._message,
        });
      });
  }
};

exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    res.status(400).send({
      message: "Bad Request",
    });
  } else {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      const newCart = new Cart({
        user: userId,
        items: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      });
      newCart
        .save()
        .then(() => {
          res.status(200).send({
            message: "New Cart Saved",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: err._message,
          });
        });
    } else {
      const existingProduct = cart.items.find(
        (item) => item.product == productId
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        const newProduct = {
          product: productId,
          quantity: 1,
        };
        cart.items.push(newProduct);
      }
      cart.save();
      res.status(200).send({
        message: "Cart Updated Successfully",
      });
    }
  }
};
