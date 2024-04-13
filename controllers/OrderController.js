// controllers/OrderController.js

const Order = require("../models/Order");

// Get all orders
exports.getAllOrders = async (req, res) => {
  // Implement logic to fetch all orders
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  // Implement logic to fetch an order by ID
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    // Extract order data from the request body
    const {
      userId,
      shippingMethod,
      paymentMethod,
      payOnDeliveryOption,
      totalPrice,
      cartItems,
      formData,
    } = req.body;

    // Create a new order instance
    const newOrder = new Order({
      userId: userId,
      shippingMethod: shippingMethod,
      payOnDeliveryOption: payOnDeliveryOption,
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      cartItems: cartItems,
      formData: formData,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    console.log("order places successully");
    // Return a success response to the client
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    // Return an error response to the client
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the order",
      error: error.message,
    });
  }
};
exports.getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  // Implement logic to update an order
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  // Implement logic to delete an order
};
// Controller function to update cancelOrder field
exports.requestCancelOrder = async (req, res) => {
  const { userId, orderId } = req.body;

  try {
    // Find the order by userId and orderId
    const order = await Order.findOne({ userId, _id: orderId });

    if (!order) {
      console.log(`order not found`);
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the cancelOrder field to true
    order.requestCancelOrder = true;

    // Save the updated order
    await order.save();

    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
