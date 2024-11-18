const Cart = require("../../models/cartModel");
const User = require("../../models/userModels");
const multer = require("multer");

const createAddToCart = async (req,res)=>{
    try {
        const {userId,productId,quantity} = req.body;
        console.log("req.body", req.body)

        const cartItem = await Cart.findOne({_id:productId})
        console.log("cartitem:" , cartItem)
        if(cartItem){
            cartItem.productCount += 1;
            
        }else{
             cartItem = new Cart({userId,productId,quantity})
        }

        await cartItem.save();
        res.status(201).json({message : "Product added in cart done."})

    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({message : "Internal Server Error"})        
    }
}

const getCartById = async(req,res)=>{
      try {
         const productId = req.params.productId;
         console.log("req.params:", req.params)
         console.log("productid",productId)

         const product = await Cart.findById(productId)
         res.status(201).json(product);

        
      } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({message : "Internal Server Error"})        
    }
} 

const getAllProduct = async(req,res)=>{
    try {
        const data = await Cart.find();
        res.status(201).send(data)
    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({message : "Internal Server Error"}) 
    }
}

const updateCart = async(req,res)=>{
    try {
        const {productId,quantity} = req.body
        console.log("req.body: ", req.body)

        
        const user = await Cart.findById(productId)

        if(!user){
            res.status(404).json({message: "Cart Product not found."})
        }

        if(quantity){
            user.quantity += quantity;
        }

        const updatedQuantity = await Cart.save();
        res.status(200).json(updatedQuantity);
        
    } catch (error) {
        console.log("Internal Server Error", error)
        res.status(500).json({message : "Internal Server Error"})  
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploadCartProduct";
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const fileExt = file.originalname;
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
    },
});
const cartUpload = multer({ storage: storage });

module.exports = {createAddToCart,cartUpload,getCartById,getAllProduct,updateCart};


























// const cartUserId = req.params.userId;
// // const productId = req.params.productId;
// console.log("req.params:", req.params)
// console.log("userid",cartUserId)
// // console.log("req", req)

// const cartUserExist = await User.findById(cartUserId)
// res.status(200).json({message:"cartUser is exist"})
// console.log("cartUserExist", cartUserExist)

// if(!cartUserExist){
//     res.status(404).json({message : "Cart User not found"})
// }