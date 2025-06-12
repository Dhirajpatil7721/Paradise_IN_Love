// import mongoose from "mongoose";

// const wishlistSchema = new mongoose.Schema({


//   wishlist: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "product",
//     },
//   ],

//   // timestamps etc.
// }, {
//   timestamps: true,
// });

// const wishlistModel = mongoose.model("wishlist", wishlistSchema);

// export default wishlistModel;



import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
}, { timestamps: true });

const wishlistModel = mongoose.model("wishlist", wishlistSchema);
export default wishlistModel;