const express = require("express");
const router = express.Router();

const productController = require("../Controller/product.controller");

router.get("/", productController.getIndex);

module.exports = router;
