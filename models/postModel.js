const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default : 0,
  },
  commentby: [
    {
      text: String,
      type: {type: mongoose.Schema.Types.ObjectId , ref: "User"},
      date: {type:Date, default:Date.now}
    }
],
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Post = mongoose.model("post", schema);
module.exports = Post;
