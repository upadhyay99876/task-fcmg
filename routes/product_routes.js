const express = require("express");
const router = express.Router();
const multer = require("multer");
const ProdController = require("../controller/product_controller")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${Date.now()}.${ext}`);
  },
});
/******UPLOADED FILE SHOULD BE JPEG AND PNG TYPE */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

router.post("/createProduct", upload.single("productImage"), ProdController.createProduct);

router.get("/getProduct", ProdController.getProducts);

module.exports = router;
