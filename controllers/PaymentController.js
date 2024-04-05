require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Generate a unique ID for this payment attempt
    const paymentId = uuid();

    // Check if the payment ID already exists in the database
    // If it does, return an error to prevent duplicate charges
    // You'll need to implement this logic based on your database structure
    // For demonstration, let's assume a function called `checkPaymentIdExists`
    const paymentExists = await checkPaymentIdExists(paymentId);
    if (paymentExists) {
      return res
        .status(400)
        .json({ error: "Duplicate payment attempt detected" });
    }

    // PaymentIntent using the Stripe API with an idempotency key
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount,
        currency,
      },
      {
        // Use the payment ID as the idempotency key
        idempotencyKey: paymentId,
      },
    );

    // Store the payment ID in your database for future reference
    // You'll need to implement this based on your database structure
    // For demonstration, let's assume a function called `storePaymentId`
    await storePaymentId(paymentId);

    // Send client secret and payment ID to the frontend
    res
      .status(200)
      .json({ clientSecret: paymentIntent.client_secret, paymentId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkPaymentIdExists = async (paymentId) => {
  // Implement logic to check if payment ID exists in the database
  // Return true if it exists, false otherwise
  // This is just a mock implementation, you'll need to replace it with your actual database query
  return false; // Assuming payment ID doesn't exist initially
};

// Mock implementation of storing payment ID in the database
const storePaymentId = async (paymentId) => {
  // Implement logic to store payment ID in the database
  // This is just a mock implementation, you'll need to replace it with your actual database query
  console.log(`Stored payment ID: ${paymentId}`);
};
