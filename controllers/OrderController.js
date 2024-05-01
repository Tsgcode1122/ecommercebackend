// controllers/OrderController.js

const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
// Update an order
exports.updateOrder = async (req, res) => {
  const { orderId, paymentStatus, orderStatus } = req.body;
  console.log(orderId, paymentStatus, orderStatus);
  try {
    // Find the order by ID
    const order = await Order.findById(orderId);
    console.log(order);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if payment status is completed from frontend and pending or failed from backend
    if (
      paymentStatus === "completed" &&
      (order.paymentStatus === "pending" || order.paymentStatus === "failed")
    ) {
      // Update payment status and order status
      order.paymentStatus = paymentStatus;
      order.orderStatus = orderStatus;

      // Save the updated order
      await order.save();

      // Loop through cart items to update product stock
      for (const item of order.cartItems) {
        const { details } = item;
        const { Quantity, itemId } = details;

        // Split itemId to get productId, color, and size
        const productId = itemId.substring(0, 24);
        const color = itemId.substring(24, itemId.search(/[A-Z]/));
        const size = itemId.substring(itemId.search(/[A-Z]/));

        console.log(
          `Product ID: ${productId}, Quantity: ${Quantity}, Color: ${color}, Size: ${size}`,
        );

        // Find the product by productId
        const product = await Product.findById(productId);
        if (!product) {
          console.error(`Product with ID ${productId} not found`);
          continue; // Move to the next iteration
        }

        // Find the variant that matches the color and size
        const variant = product.variants.find(
          (v) => v.color === color && v.sizes.some((s) => s.size === size),
        );
        if (variant) {
          // Get the size variant
          const sizeVariant = variant.sizes.find((s) => s.size === size);
          if (sizeVariant) {
            // Log initial stock
            console.log(`Initial Stock: ${sizeVariant.stock}`);

            // Update the stock of the variant
            sizeVariant.stock -= Quantity;

            // Deduct from the overall stock of the product
            product.overallStock -= Quantity;

            // Log final stock
            console.log(`Final Stock: ${sizeVariant.stock}`);

            await product.save();
            console.log(
              `Stock updated for product ${productId}, color ${color}, size ${size}`,
            );
          }
        }
      }

      // Set payment status to completed from backend
      order.paymentStatus = "completed";
      await order.save();
    } else {
      order.paymentStatus = paymentStatus;
      order.orderStatus = orderStatus;

      // Save the updated order
      await order.save();
    }

    res.status(200).json({ message: "Order updated successfully" });
    console.log("successfully updated order");
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
exports.getOrdersToCancel = async (req, res) => {
  try {
    const orders = await Order.find({ requestCancelOrder: true });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders to cancel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
exports.cancelOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order status to 'cancelled'
    order.orderStatus = "cancelled";

    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
