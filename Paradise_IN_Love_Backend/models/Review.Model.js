// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "product",
//     required: true
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user", // optional, if you have a user model
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5
//   },
//   comment: {
//     type: String,
//     default: ""
//   }
// }, {
//   timestamps: true
// });

// const ReviewModel = mongoose.model("review", reviewSchema);
// export default ReviewModel;


import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // optional, if you have a user model
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

const ReviewModel = mongoose.model("review", reviewSchema);
export default ReviewModel;
