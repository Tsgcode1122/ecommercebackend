const OnSaleMotionSlide = require("../models/OnSaleMotionSlide");

// Create on-sale motion slide
exports.createOnSaleMotionSlide = async (req, res) => {
  try {
    // Check if there's already an on-sale motion slide
    const existingSlide = await OnSaleMotionSlide.findOne();
    if (existingSlide) {
      return res
        .status(400)
        .json({ error: "Only one on-sale motion slide is allowed" });
    }

    const { text, startDate, endDate, enabled } = req.body;
    const newSlide = new OnSaleMotionSlide({
      text,
      startDate,
      endDate,
      enabled,
    });
    await newSlide.save();
    res.status(201).json(newSlide);
  } catch (error) {
    console.error("Error creating on-sale motion slide:", error);
    res.status(500).json({ error: "Failed to create on-sale motion slide" });
  }
};

// Edit on-sale motion slide
exports.editOnSaleMotionSlide = async (req, res) => {
  try {
    const { text, startDate, endDate, enabled } = req.body;
    const slide = await OnSaleMotionSlide.findOne();
    if (!slide) {
      return res.status(404).json({ error: "On-sale motion slide not found" });
    }
    slide.text = text;
    slide.startDate = startDate;
    slide.endDate = endDate;
    slide.enabled = enabled;
    await slide.save();
    res.json(slide);
  } catch (error) {
    console.error("Error editing on-sale motion slide:", error);
    res.status(500).json({ error: "Failed to edit on-sale motion slide" });
  }
};

// Get on-sale motion slide
exports.getOnSaleMotionSlide = async (req, res) => {
  try {
    const slide = await OnSaleMotionSlide.findOne();
    if (!slide) {
      return res.status(404).json({ error: "On-sale motion slide not found" });
    }
    res.json(slide);
  } catch (error) {
    console.error("Error fetching on-sale motion slide:", error);
    res.status(500).json({ error: "Failed to fetch on-sale motion slide" });
  }
};
