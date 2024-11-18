
const Post = require("../models/postModel");


const postControl = async (req, res) => {
  try {
    console.log("req.file: ", req.file);
    const data = await Post.create({
      title: req.file.filename,
    });
    res.status(200).json({
        success: true,
        message: "Post uploaded successfully", 
        data: data,
      });
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).json({ success: true, message: "Internal Server Error" });
  }
};

module.exports = postControl;
