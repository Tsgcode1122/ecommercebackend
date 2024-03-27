// server/server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db"); // Import database connection

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const orderRoutes = require("./routes/order");
const reviewRoutes = require("./routes/review");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
