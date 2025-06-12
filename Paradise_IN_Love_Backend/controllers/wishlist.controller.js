import wishlistModel from "../models/wishlist.model.js";

// ✅ Add product to wishlist
export const addToWishlist = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  try {
    let wishlist = await wishlistModel.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new wishlistModel({
        user: userId,
        wishlist: [productId]
      });
    } else if (!wishlist.wishlist.includes(productId)) {
      wishlist.wishlist.push(productId);
    }

    await wishlist.save();
    res.status(200).json({ success: true, wishlist: wishlist.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;

  try {
    const wishlist = await wishlistModel.findOne({ user: userId });

    if (!wishlist) return res.status(404).json({ success: false, message: "Wishlist not found" });

    wishlist.wishlist = wishlist.wishlist.filter(id => id.toString() !== productId);
    await wishlist.save();

    res.status(200).json({ success: true, wishlist: wishlist.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get wishlist with product details
export const getWishlist = async (req, res) => {
  const userId = req.userId;

  try {
    const wishlist = await wishlistModel.findOne({ user: userId }).populate("wishlist");
    console.log("Wishlist found:", wishlist); // Add this line

    if (!wishlist) {
      console.log("No wishlist found for user:", userId); // Add this line
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }
    res.status(200).json({ success: true, wishlist: wishlist.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Clear wishlist
export const clearWishlist = async (req, res) => {
  const userId = req.userId;

  try {
    const wishlist = await wishlistModel.findOne({ user: userId }); 

    if (!wishlist) {
      return res.status(404).json({ success: false, message: "Wishlist not found" });
    }

    wishlist.wishlist = [];
    await wishlist.save();

    res.status(200).json({ success: true, message: "Wishlist cleared" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};