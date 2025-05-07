const express = require("express");
const shopController = require("../Controller/shop.controller");

const router = express.Router();

router.get("/", shopController.getCart);
router.post("/", shopController.addToCart);

module.exports = router;
