const Cart = require("../../models/cartModel");

const cartPostControl = async (req, res) => {
  try {
    console.log("req.file: ", req.file);
    const data = await Cart.create({
      Name: req.file.filename,
    });
    res.status(200).json({
      success: true,
      message: "Product Post uploaded successfully",
      data: data,
    });
  } catch (error) {
    console.log("Internal Server Error", error);
    res.status(500).json({ success: true, message: "Internal Server Error" });
  }
};

module.exports = cartPostControl;
