import ReviewModel from '../models/Review.Model.js';
import ProductModel from "../models/product.model.js"; 
import mongoose from "mongoose";
//Add
export const addReview = async (req, res) => {
  try {
    const { productId, userId, rating, comment } = req.body;

    const review = await ReviewModel.create({
      product: productId,
      user: userId,
      rating,
      comment
    });

    return res.json({
      message: "Review added successfully",
      data: review,
      success: true,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true
    });
  }
};

// Get all reviews 
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find(); // No filter, fetch all reviews

    return res.json({
      message: "All reviews fetched successfully",
      data: reviews,
      success: true,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true
    });
  }
};

//Show reviews in getProductDetails
export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid product ID",
        success: false,
        error: true,
      });
    }

    // Fetch reviews
    const reviews = await ReviewModel.find({ product: productId }).populate("user", "name");

    return res.json({
      message: "Reviews fetched successfully",
      data: reviews,
      success: true,
      error: false,
    });
  } catch (error) {
    console.error("Error in getReviewsByProductId:", error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error: true,
    });
  }
};




