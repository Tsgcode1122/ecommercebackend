// routes/auth.js
const passport = require("passport");
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.post("/check-exists", AuthController.checkEmailExists);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to dashboard or homepage
    res.redirect("/");
  },
);

module.exports = router;
