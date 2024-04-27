require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./db"); // Import database connection
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const app = express();
const PORT = process.env.PORT || 5005;
const { sessionStore } = require("./db");
app.set("trust proxy", 1);
app.use(cors());
app.use(express.json());
const crypto = require("crypto");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const orderRoutes = require("./routes/order");
const reviewRoutes = require("./routes/review");
const emailRoutes = require("./routes/emailRoutes");
const resetRoutes = require("./routes/resetRoutes");
const paymentsRoutes = require("./routes/payments");
const saleRoutes = require("./routes/salePopup");
const onSaleMotionSlideRoutes = require("./routes/onSaleMotionSlideRoutes");
const { randomBytes } = require("crypto");

// Print the generated JWT secret

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/reset", resetRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/salePopup", saleRoutes);
app.use("/api/onSaleMotionSlide", onSaleMotionSlideRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
