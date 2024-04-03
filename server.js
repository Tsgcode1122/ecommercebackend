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

// Generate a random string of specified length
const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // Convert to hexadecimal format
    .slice(0, length); // Trim to desired length
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // Handle Google authentication here
      // This callback function will be called after successful authentication
      // You can find the user profile data in the 'profile' object
    },
  ),
);

// Generate a strong random secret key
// const generateSecretKey = () => {
//   return crypto.randomBytes(32).toString("hex"); // 32 bytes is a good length for a secure key
// };

// // Example usage
// const secretKey = generateSecretKey();
// console.log("Generated secret key:", secretKey);

// Define routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const orderRoutes = require("./routes/order");
const reviewRoutes = require("./routes/review");
const emailRoutes = require("./routes/emailRoutes");
const resetRoutes = require("./routes/resetRoutes");
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
// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
