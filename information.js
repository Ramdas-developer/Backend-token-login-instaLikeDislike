const updateCart = async (req, res) => {
  try {
      const { productId, quantity } = req.body; // Get productId and quantity from req.body
      console.log("req.body: ", req.body);

      // Find the cart
      const cart = await Cart.findOne(); // Replace with user-specific query if needed
      console.log("cart:", cart);

      if (!cart) {
          return res.status(404).json({ message: "Cart not found." });
      }

      // Check if the product exists in the cart
      const productIndex = cart.product.findIndex(
          (item) => item.productId.toString() === productId
      );

      if (productIndex !== -1) {
          // Update quantity if the product exists
          cart.product[productIndex].quantity += Number(quantity);
      } else {
          // Add a new product to the cart
          cart.product.push({
              productId,
              quantity: Number(quantity),
              price: 0, // Add price logic if available
          });
      }

      // Save the updated cart
      const updatedCart = await cart.save();

      res.status(200).json({
          message: "Cart item updated successfully",
          updatedCart,
      });
  } catch (error) {
      console.error("Internal Server Error", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};
