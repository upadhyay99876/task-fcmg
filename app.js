const express = require("express");
const app = express();
require('./db/db')
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const port = process.env.PORT || 3000;
const categoryRoute = require("./routes/category_routes");
const productRoute = require("./routes/product_routes");
const cartRoute = require("./routes/cart_routes");
const userRoute = require("./routes/user_routes");
const swaggerDocument = require("./swagger.json");

// Use body parser middleware to parse body of incoming requests
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes which should handle requests
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/cart", cartRoute);
app.use("/user", userRoute);



// Handle Error Requests just like global error handler
app.use((req, res, next) => {
  const error = new Error();
  error.message = "Not Found";
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
