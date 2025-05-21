const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (req, res) => {
  const { name } = req.body;
  console.log("Gelen name:", name);

  try {
    const product = await Product.findByName(name);
    console.log("The product in database:", product);
    if (!product || !product.name || !product.price) {
      return res.status(400).send("Invalid product data");
    }

    await Cart.add(product);
    res.status(200).end();
  } catch (error) {
    console.error("Error while adding product:", error);
    res.status(500).send("Eklenemedi.");
  }
};

exports.getProductsCount = async () => {
  return await Cart.getProductsQuantity();
};


