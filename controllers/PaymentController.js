const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uuid = require("uuid");

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, email, paymentMethod } = req.body;

    // Generate a unique idempotency key
    const idempotencyKey = uuid.v4();

    // Create payment intent with idempotency key
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: amount,
        currency: currency,
        payment_method: paymentMethod.id,
        confirm: true,
        receipt_email: email,
        return_url: "http://localhost:5173/",
      },
      {
        idempotencyKey,
      },
    );

    // Log payment success
    console.log("Payment intent created successfully:", paymentIntent);
    res.json({ paymentIntent });
  } catch (error) {
    console.error("Payment intent creation error:", error);
    res.status(500).json({ error: error.message });
  }
};
