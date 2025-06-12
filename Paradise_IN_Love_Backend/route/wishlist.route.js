import express from "express";
import { addToWishlist, clearWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";
import auth from "../middleware/auth.js";


const wishlistrouter = express.Router();

wishlistrouter.post("/create",auth, addToWishlist);
wishlistrouter.delete("/remove", auth,removeFromWishlist);
wishlistrouter.get("/get",auth, getWishlist);
wishlistrouter.delete("/clear",auth, clearWishlist);          

export default wishlistrouter;
