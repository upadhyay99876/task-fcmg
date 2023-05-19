const router = require("express").Router();
const userController = require("../controller/user_controller");
const { verifyUser} = require("../middleware/token");

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

router.patch('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

router.get("/data", verifyUser, userController.data);

module.exports = router;
