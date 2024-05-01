const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    variants: [
      {
        color: { type: String, required: true },
        sizes: [
          {
            size: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
          },
        ],
      },
    ],
    brand: { type: String },
    overallStock: { type: Number },
    category: [{ type: String }],
    productId: { type: String },
    price: { type: [Number] },
    onSale: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: true, required: true },
    isNewRelease: { type: Boolean, default: false },
    // orderCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
