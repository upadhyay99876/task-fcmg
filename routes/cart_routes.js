const router = require("express").Router();
const cartController = require("../controller/cart_controller");


router.post("/createOrder", cartController.createOrder);

router.get("/:cartId", cartController.getOrder);

router.get("/show/:userId", cartController.getAllOrders);

module.exports = router;
