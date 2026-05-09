import Feedback from "../models/Feedback.js";

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Private
export const createFeedback = async (req, res) => {
  try {
    const { rating, review } = req.body;

    if (!rating || !review) {
      return res.status(400).json({ message: "Please provide a rating and review" });
    }

    const feedback = new Feedback({
      user: req.user._id,
      rating: Number(rating),
      review,
    });

    const createdFeedback = await feedback.save();
    res.status(201).json(createdFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private/Admin
export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({}).populate("user", "name email role");
    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
