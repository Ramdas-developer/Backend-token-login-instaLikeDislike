const Post = require("../models/postModel");
const User = require("../models/userModels");

const SignUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    console.log("req.body", req.body);

    const data = await User.create({
      name: name,
      email: email,
      phone: phone,
      password: password,
    });
    console.log("data :", data);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};
const getUser = async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (error) {
    res.send("Data Getting Error", error);
    console.error("data get error :", error);
  }
};

const getPost = async (req, res) => {
  try {
    const data = await Post.find();
    res.send(data);
  } catch (error) {
    res.send("Data Getting Error", error);
    console.error("data get error :", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedItem = await User.findByIdAndDelete(userId);

    if (!deletedItem) {
      return res.ststus(404).json({ message: " user not found " });
    }
    res.json({ message: " user deleted succecfully." });
  } catch (error) {
    console.error("error deleting user", error);
  }
};

const updateData = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Request parameters:", "",req.params);

    const updatedItem = await User.findByIdAndUpdate(
      userId,
      { 
        $set: { 
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password
        }
    },
      { new: true }, // Returns the updated document
      console.log("name :",    req.body.name),
      console.log("email :",   req.body.email),
      console.log("phone :",   req.body.phone),
      console.log("password :",req.body.password)
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", data: updatedItem });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
    console.log("Error in updating : ", error)
  }
};

module.exports = { SignUp, getUser, deleteUser, updateData ,getPost};
