// controllers/DiscountController.js

const CouponCode = require("../models/CouponCode");
const PercentageOff = require("../models/PercentageOff");
const Product = require("../models/Product");
exports.createCouponCode = async (req, res) => {
  const { code, percentageOff, minimumOrder } = req.body;

  try {
    // Check if the coupon code already exists
    const existingCouponCode = await CouponCode.findOne({ code });
    if (existingCouponCode) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    // Create a new coupon code
    const newCouponCode = new CouponCode({
      code,
      percentageOff,
      minimumOrder,
    });

    // Save the coupon code to the database
    await newCouponCode.save();

    res.status(201).json({ message: "Coupon code created successfully" });
  } catch (error) {
    console.error("Error creating coupon code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllCouponCodes = async (req, res) => {
  try {
    const couponCodes = await CouponCode.find({});
    res.status(200).json(couponCodes);
  } catch (error) {
    console.error("Error fetching coupon codes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.updateCouponCode = async (req, res) => {
  const { id } = req.params;
  const { code, percentageOff, minimumOrder, active } = req.body;

  try {
    // Find the coupon code by ID
    let coupon = await CouponCode.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon code not found" });
    }

    // Update the coupon code
    coupon.code = code;
    coupon.percentageOff = percentageOff;
    coupon.minimumOrder = minimumOrder;
    coupon.active = active;

    // Save the updated coupon code
    coupon = await coupon.save();

    res
      .status(200)
      .json({ message: "Coupon code updated successfully", coupon });
  } catch (error) {
    console.error("Error updating coupon code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.deleteCouponCode = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the coupon code by ID and delete it
    await CouponCode.findByIdAndDelete(id);
    res.status(200).json({ message: "Coupon code deleted successfully" });
  } catch (error) {
    console.error("Error deleting coupon code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.createPercentageOff = async (req, res) => {
  const { percentageOff, name, startDate, endDate } = req.body;

  try {
    // Create a new percentage off discount
    const newPercentageOff = new PercentageOff({
      percentageOff,
      name,
      startDate,
      endDate,
    });

    // Save the percentage off discount to the database
    await newPercentageOff.save();

    res
      .status(201)
      .json({ message: "Percentage off discount created successfully" });
  } catch (error) {
    console.error("Error creating percentage off discount:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.getAllPercentageOff = async (req, res) => {
  try {
    const percentages = await PercentageOff.find();
    res.status(200).json(percentages);
  } catch (error) {
    console.error("Error fetching percentage off discounts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.applyPercentageDiscount = async (req, res) => {
  const { productIds, percentageId } = req.body;
  console.log(productIds, percentageId);
  try {
    // Get selected percentage from database
    const percentage = await PercentageOff.findById(percentageId);

    // Check if percentage exists
    if (!percentage) {
      return res.status(404).json({ message: "Percentage discount not found" });
    }

    // Check if percentage is already active
    if (percentage.active) {
      // If already active, leave it as is
      console.log(`Percentage discount ${percentage.name} is already active`);
    } else {
      // If not active, set active to true
      percentage.active = true;
      await percentage.save();
      console.log(`Percentage discount ${percentage.name} is now active`);
    }

    // Fetch products and apply discount
    const products = await Product.find({ _id: { $in: productIds } });

    for (const product of products) {
      // Check if product exists
      if (!product) {
        console.warn(`Product not found for ID: ${product._id}`);
        continue; // Skip to the next iteration
      }

      // Check if product is already on sale
      if (product.onSale) {
        // If already on sale, leave it as is
        console.log(`Product ${product.name} is already on sale`);
      } else {
        // If not on sale, turn on the onSale flag
        product.onSale = true;
        await product.save();
        console.log(`Product ${product.name} is now on sale`);
      }
    }

    // Respond with success message
    return res
      .status(200)
      .json({ message: "Percentage discount applied successfully" });
  } catch (error) {
    console.error("Error applying percentage discount:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
