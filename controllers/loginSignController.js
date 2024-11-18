const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");
const multer = require("multer");
const Post = require("../models/postModel");


const loginUser = async (req, res) => {
  const { email, password, } = req.body;
  console.log("req.body:", req.body);

  try {
    const user = await User.findOne({ email });
    console.log("user:", user);
    console.log("userpassword :", user.password);
    console.log("original password :", password);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("ismatch", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    // create jwt token
    const token = jwt.sign({ id: user._id, email: user.email }, "mySecretKey");
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//create multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "upload";
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const fileExt = file.originalname;
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
  },
});
const upload = multer({ storage: storage });


const like = async(req,res)=>{
     try {
     const postId = req.params.postId;
     const userId = req.params.userId;
      console.log("req.params :",req.params)
      console.log("postid :",postId)
      console.log("userid :",userId)  

      const postExist = await Post.findById(postId)
      const userExist = await User.findById(userId)

      if(!postExist){
        res.status(404).json({message : "Post not found"})
      }

      if(!userExist){
        res.status(404).json({message: "User not found"})
      }

      if(postExist.likedBy.includes(userId)){
        res.status(207).json({message : "Post Already Liked"})
      }

      if(postExist.dislikedBy.includes(userId)){
        postExist.dislikedBy.pull(userId);
        postExist.dislike -= 1;
      }

      postExist.likedBy.push(userId)
      postExist.like += 1;

      const savedLikes = await postExist.save()
      res.status(200).json(savedLikes);
      console.log("savedLikes: ", savedLikes)
      
     } 
     catch (error) {
      console.log("Internal server Error", error);
      res.status(500).json({message : "Internal Server error"})
       
     }
}




// dislike logic
const dislike = async(req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    console.log("postid: ", postId);
    console.log("userid: ", userId); 
    console.log("req.params",req.params)
    // console.log("req",req)
    
    
    const postExist = await Post.findById(postId);
    const userExist = await User.findById(userId);
    console.log("postExist: ", postExist)
    console.log("userExist: ", userExist)
    
    if (!postExist) {
      return res.status(400).json({ message: "PostId not found" });
    }

    if (!userExist) {
      return res.status(400).json({ message: "userId not found" });
    }

    if(postExist.dislikedBy.includes(userId)){
        return res.status(201).json({message: "Post already disliked"})
    }

    if(postExist.likedBy.includes(userId)){
      postExist.likedBy.pull(userId);
      postExist.like -= 1;
    }

    postExist.dislikedBy.push(userId);
    postExist.dislike += 1;
    
    const savedDisLikes = await postExist.save();
    res.status(200).json(savedDisLikes);
    console.log("savedDisLikes",savedDisLikes)
    
  } catch (error) {
    console.log("Internal Server error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//comment logic 
const commentOnPost = async(req,res) =>{
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    const {comment}= req.body
    console.log("postid: ", postId);
    console.log("userid: ", userId);
    console.log("req.params",req.params)
    // console.log("req",req)

    
    const postExist = await Post.findById(postId);
    const userExist = await User.findById(userId);
    console.log("postExist: ", postExist)
    console.log("userExist: ", userExist)

    if (!postExist) {
      return res.status(400).json({ message: "PostId not found" });
    }

    if (!userExist) {
      return res.status(400).json({ message: "userId not found" });
    }

    const commentByUser = {
      text: comment ,
      type: userId,
      date: Date.now(),
    }
    postExist.comment += 1
    postExist.commentby.push(commentByUser);

    const updatedComments = await postExist.save();
    res.status(200).json(updatedComments);
    console.log("updatedComments",updatedComments)
    
  } catch (error) {
    console.log("Internal Server error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

}

module.exports = { loginUser, upload, like, dislike, commentOnPost };
    























// like logic
    // const like = async (req, res) => {
      //   try {
        //     const postId = req.params.postId;
    //     const userId = req.params.userId;
    //     console.log("postid: ", postId);
    //     console.log("userid: ", userId);
    //     console.log("req.params",req.params)
    //     // console.log("req",req)
    
    
    //     const postExist = await Post.findById(postId);
    //     const userExist = await User.findById(userId);
    //     console.log("postExist: ", postExist)
    //     console.log("userExist: ", userExist)
    
    //     if (!postExist) {
    //       return res.status(400).json({ message: "PostId not found" });
    //     }
    
    //     if (!userExist) {
    //       return res.status(400).json({ message: "userId not found" });
    //     }
    
    //     if(postExist.likedBy.includes(userId)){
    //         return res.status(201).json({message: "Post already liked"})
    //     }
    
    //     if(postExist.dislikedBy.includes(userId)){
    //       postExist.dislikedBy.pull(userId);
    //       postExist.dislike -= 1;
    //     }
    
    //     postExist.likedBy.push(userId);
    //     postExist.like += 1;
    
    //     const savedLikes = await postExist.save();
    //     res.status(200).json(savedLikes);
    //     console.log("savedLikes: ", savedLikes)
        
    //   } catch (error) {
    //     console.log("Internal Server error", error);
    //     res.status(500).json({ message: "Internal Server Error" });
    //   }
    // };
