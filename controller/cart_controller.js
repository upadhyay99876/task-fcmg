const Cart = require("../model/cart_model");
const Product = require("../model/product_model");


exports.createOrder = async (req, res, next) => {
  const newOrder = {
    product: req.body.productId,
    quantity: req.body.quantity,
    user: req.body.userId,
  };
  console.log(newOrder)

  try {
    const stock = await Product.findById(newOrder.product);
    if (newOrder.quantity > stock.quantity) return res.status(200).send({ message: "Product is out of stock" });
    const product = await Cart.create(newOrder);
    const update = { quantity: stock.quantity - newOrder.quantity };
    await Product.findByIdAndUpdate(stock.id, update, { new: true });
    return res.status(200).send({ message: "Order created successfully!", product });
  } catch (error) {
    return res.status(400).send({ message: "unable to create order", error });
  }
};

exports.getOrder = async (req, res, next) => {
  await Cart.findById(req.params.cartId)
    .populate("product", "productImage name price")
    .exec((err, cart) => {
      if (err) return res.status(400).send({ message: "showing order", err });
      const order = returnOrder(cart);
      return res.status(200).send({ message: "showing order", order });
    });
};

exports.getAllOrders = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    results,
  });
};

function returnOrder(cart) {
  return {
    name: cart.product.name,
    description: cart.product.description,
    price: cart.product.price,
    quantity: cart.quantity,
    total: cart.product.price * cart.quantity,
    image: cart.product.productImage,
    orderDate: cart.createdAt,
  };
}
