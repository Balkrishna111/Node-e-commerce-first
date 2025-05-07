const express = require("express");

const router = express.Router();

const productController = require("../Controller/product.controller");
const userController = require("../Controller/user.controller");

// Product Routes

router.post("/product", productController.postProduct);
router.delete("/product/:productId", productController.deleteProduct);
router.put("/product", productController.editProduct);

// User Routes

router.post("/user", userController.createUser);

module.exports = router;
